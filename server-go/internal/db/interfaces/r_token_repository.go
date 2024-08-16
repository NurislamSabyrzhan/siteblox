package interfaces

import (
	"context"
	"server/internal/models"
)

type TokenRepositoryInterface interface {
	Save(ctx context.Context, token *models.RefreshToken) error
	GetByToken(ctx context.Context, token string) (*models.RefreshToken, error)
	Delete(ctx context.Context, token string) error
	DeleteAll(ctx context.Context, userId string) error
}
