package services

import (
	"context"
	"errors"
	"fmt"
	"github.com/Kesio-dev/mal"
	"go.mongodb.org/mongo-driver/mongo"
	"server/internal/http/auth/dto"
	"server/pkg/tokens"
	"time"
)

type AuthService struct {
	userService  *UserService
	tokenService *RTokenService
	jwtSecret    string
}

func NewAuthService(userService *UserService, tokenService *RTokenService, jwtSecret string) *AuthService {
	return &AuthService{
		userService:  userService,
		tokenService: tokenService,
		jwtSecret:    jwtSecret,
	}
}

func (s *AuthService) RegisterUser(ctx context.Context, userDTO *dto.RegisterUserDTO) (string, string, error) {
	user, err := s.userService.CreateUser(ctx, userDTO)
	if err != nil {
		if mongo.IsDuplicateKeyError(err) {
			mal.Error("mongoDB duplicate error email")
			return "", "", fmt.Errorf("duplicate email")
		}

		return "", "", err
	}

	accessToken, err := tokens.GenerateAccessToken(s.jwtSecret, user.ID.Hex(), 15*time.Minute)
	if err != nil {
		mal.Error("Error to generate at")
		return "", "", err
	}

	refreshToken, err := tokens.GenerateRefreshToken(s.jwtSecret, user.ID.Hex(), 7*24*time.Hour)
	if err != nil {
		mal.Error("Error to generate rt")
		return "", "", err
	}

	err = s.tokenService.SaveRefreshToken(ctx, user.ID, refreshToken)
	if err != nil {
		mal.Error("Error to save RT")
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (s *AuthService) LogIn(ctx context.Context, userDTO *dto.LoginUserDTO) (string, string, error) {
	user, err := s.userService.GetUserByEmail(ctx, userDTO.Email)
	if err != nil {
		mal.Error("Error to get user from repo")
		if errors.Is(err, mongo.ErrNoDocuments) {
			return "", "", errors.New("user not found")
		}
		return "", "", err
	}

	if !CheckPassword(user.Password, userDTO.Password) {
		return "", "", fmt.Errorf("password don't match")
	}

	accessToken, err := tokens.GenerateAccessToken(s.jwtSecret, user.ID.Hex(), 15*time.Minute)
	if err != nil {
		mal.Error("Error to generate at")
		return "", "", err
	}

	refreshToken, err := tokens.GenerateRefreshToken(s.jwtSecret, user.ID.Hex(), 7*24*time.Hour)
	if err != nil {
		mal.Error("Error to generate rt")
		return "", "", err
	}

	err = s.tokenService.SaveRefreshToken(ctx, user.ID, refreshToken)
	if err != nil {
		mal.Error("Error to save RT")
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

func (s *AuthService) DeleteCookie(ctx context.Context, rt string) error {
	err := s.tokenService.DeleteToken(ctx, rt)
	if err != nil {
		return err
	}
	return nil
}

func (s *AuthService) DeleteAllCookies(ctx context.Context, userId string) error {
	err := s.tokenService.DeleteAllTokens(ctx, userId)
	if err != nil {
		return err
	}
	return nil
}
