package auth

import (
	"github.com/gofiber/fiber/v2"
	"server/internal/http/auth/dto"
	"server/internal/services"
)

type Controller struct {
	authService *services.AuthService
}

func NewAuthController(authService *services.AuthService) *Controller {
	return &Controller{
		authService: authService,
	}
}

func (c *Controller) Register(ctx *fiber.Ctx) error {
	var userDTO dto.RegisterUserDTO
	if err := ctx.BodyParser(&userDTO); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	at, rt, err := c.authService.RegisterUser(ctx.Context(), &userDTO)
	if err != nil {
		if err.Error() == "duplicate email" {
			return ctx.Status(fiber.StatusConflict).JSON(fiber.Map{"error": err.Error()})
		}
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "at",
		Value:    at,
		MaxAge:   30 * 60,
		HTTPOnly: true,
		SameSite: "Lax",
		Secure:   false,
	})

	ctx.Cookie(&fiber.Cookie{
		Name:     "rt",
		Value:    rt,
		MaxAge:   30 * 24 * 60 * 60,
		HTTPOnly: true,
		SameSite: "Lax",
		Secure:   false,
	})

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"at": at,
		"rt": rt,
	})
}

func (c *Controller) LogIn(ctx *fiber.Ctx) error {
	var userDTO dto.LoginUserDTO
	if err := ctx.BodyParser(&userDTO); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	at, rt, err := c.authService.LogIn(ctx.Context(), &userDTO)
	if err != nil {
		if err.Error() == "password don't match" {
			return ctx.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": err.Error()})
		}
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     "at",
		Value:    at,
		MaxAge:   30 * 60,
		HTTPOnly: true,
		SameSite: "Lax",
		Secure:   false,
	})

	ctx.Cookie(&fiber.Cookie{
		Name:     "rt",
		Value:    rt,
		MaxAge:   30 * 24 * 60 * 60,
		HTTPOnly: true,
		SameSite: "Lax",
		Secure:   false,
	})

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"at": at,
		"rt": rt,
	})
}
