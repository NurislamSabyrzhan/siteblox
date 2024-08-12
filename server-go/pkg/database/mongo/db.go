package db

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var Client *mongo.Client

// Connect устанавливает соединение с MongoDB
func Connect(uri string) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, fmt.Errorf("ошибка создания нового клиента MongoDB: %w", err)
	}
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"email": 1},
		Options: options.Index().SetUnique(true),
	}

	_, err = client.Database("myapp").Collection("users").Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		return nil, fmt.Errorf("ошибка создания уникального индекса на поле email: %w", err)
	}
	// Проверка соединения
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		return nil, fmt.Errorf("ошибка пинга MongoDB: %w", err)
	}

	fmt.Println("Успешное подключение к MongoDB")

	Client = client

	return client, nil
}

// Disconnect закрывает соединение с MongoDB
func Disconnect() error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := Client.Disconnect(ctx); err != nil {
		return fmt.Errorf("ошибка при закрытии соединения с MongoDB: %w", err)
	}

	fmt.Println("Соединение с MongoDB закрыто")
	return nil
}
