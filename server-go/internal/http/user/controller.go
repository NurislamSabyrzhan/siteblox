package user

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"server/internal/services"
)

type Controller struct {
	service *services.UserService
}

func NewUserController(service *services.UserService) *Controller {
	return &Controller{service: service}
}

//
//func (c *Controller) CreateUser(ctx *fiber.Ctx) error {
//	var user models.User
//	if err := ctx.BodyParser(&user); err != nil {
//		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
//	}
//
//	createdUser, err := c.service.CreateUser(ctx.Context(), &user)
//	if err != nil {
//		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
//	}
//
//	return ctx.Status(fiber.StatusCreated).JSON(createdUser)
//}

func (c *Controller) GetUserByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}

	user, err := c.service.GetUserByID(ctx.Context(), objID)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "User not found"})
	}

	return ctx.JSON(user)
}
