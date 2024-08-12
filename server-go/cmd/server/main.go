package main

import (
	"github.com/Kesio-dev/mal"
	"github.com/gofiber/fiber/v2"
	"log"
	"server/internal/db/mongo"
	"server/internal/http/auth"
	"server/internal/http/user"
	"server/internal/services"
	db "server/pkg/database/mongo"
)

func main() {
	uri := "mongodb://root:example@localhost:27017"
	client, err := db.Connect(uri)
	if err != nil {
		log.Fatalf("Ошибка подключения к MongoDB: %v", err)
	}
	defer func() {
		err := db.Disconnect()
		if err != nil {
			mal.Error(err)
		}
	}()

	database := client.Database("myapp")

	userRepo := mongo.NewMongoUserRepository(database)
	tokenRepo := mongo.NewTokenRepository(database)

	userService := services.NewUserService(userRepo)
	tokenService := services.NewRTokenService(tokenRepo)
	authService := services.NewAuthService(userService, tokenService, "secret")

	userController := user.NewUserController(userService)
	authController := auth.NewAuthController(authService)

	app := fiber.New()
	user.NewRouter(app, userController)
	auth.NewRouter(app, authController)

	mal.Info("Сервер запущен на порту 8080")
	log.Fatal(app.Listen(":8080"))
}
