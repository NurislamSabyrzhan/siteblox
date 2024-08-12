package user

import "github.com/gofiber/fiber/v2"

func NewRouter(app *fiber.App, controller *Controller) *fiber.App {
	api := app.Group("/user")

	//api.Post("/", controller.CreateUser)
	api.Get("/:id", controller.GetUserByID)
	//app.Put("/", controller.UpdateUser)
	//app.Delete("/:id", controller.DeleteUser)

	return app
}
