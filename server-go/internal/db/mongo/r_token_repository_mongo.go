package mongo

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"server/internal/db/interfaces"
	"server/internal/models"
)

type TokenRepository struct {
	collection *mongo.Collection
}

func NewTokenRepository(db *mongo.Database) interfaces.TokenRepositoryInterface {
	return &TokenRepository{
		collection: db.Collection("refresh_tokens"),
	}
}

func (r *TokenRepository) Save(ctx context.Context, token *models.RefreshToken) error {
	_, err := r.collection.InsertOne(ctx, token)
	return err
}

func (r *TokenRepository) GetByToken(ctx context.Context, token string) (*models.RefreshToken, error) {
	var refreshToken models.RefreshToken
	err := r.collection.FindOne(ctx, bson.M{"token": token}).Decode(&refreshToken)
	return &refreshToken, err
}

func (r *TokenRepository) Delete(ctx context.Context, token string) error {
	_, err := r.collection.DeleteOne(ctx, bson.M{"token": token})
	return err
}

func (r *TokenRepository) DeleteAll(ctx context.Context, userId string) error {
	_, err := r.collection.DeleteMany(ctx, bson.M{"_id": userId})
	return err
}
