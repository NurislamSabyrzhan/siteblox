package auth

import "github.com/gofiber/fiber/v2"

func NewRouter(app *fiber.App, controller *Controller) *fiber.App {
	api := app.Group("/auth")

	api.Post("/register", controller.Register)
	api.Post("/login", controller.LogIn)
	//api.Get("/:id", controller.GetUserByID)
	//app.Put("/", controller.UpdateUser)
	//app.Delete("/:id", controller.DeleteUser)

	return app
}
