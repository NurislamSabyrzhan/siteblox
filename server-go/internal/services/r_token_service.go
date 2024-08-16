package services

import (
	"context"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/db/interfaces"
	"server/internal/models"
	"time"
)

type RTokenService struct {
	repo interfaces.TokenRepositoryInterface
}

func NewRTokenService(repo interfaces.TokenRepositoryInterface) *RTokenService {
	return &RTokenService{repo: repo}
}

func (s *RTokenService) SaveRefreshToken(ctx context.Context, userID primitive.ObjectID, rt string) error {
	token := &models.RefreshToken{
		UserID:    userID,
		Token:     rt,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	}
	err := s.repo.Save(ctx, token)
	return err
}

func (s *RTokenService) ValidateToken(ctx context.Context, tokenStr string) (*models.RefreshToken, error) {
	token, err := s.repo.GetByToken(ctx, tokenStr)
	if err != nil || time.Now().After(token.ExpiresAt) {
		return nil, err
	}
	return token, nil
}

func (s *RTokenService) DeleteToken(ctx context.Context, tokenStr string) error {
	return s.repo.Delete(ctx, tokenStr)
}

func (s *RTokenService) DeleteAllTokens(ctx context.Context, userId string) error {
	return s.repo.DeleteAll(ctx, userId)
}
