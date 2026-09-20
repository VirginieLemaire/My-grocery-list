const { validateBody } = require("../app/middlewares/validateBody");

describe("Erreur renvoyée à la validation d'un body sur un modèle n'ayant pas de schéma zod", () => {
	// Here we can't pass by HTTP request
	// We need to mock request, response & next
	it("should reject a body for model with no schema", () => {
		// Arrange
		const request = {
			modelName: "Fake",
			params: {},
			body: { name: "test" },
		};

		// response.status(000).json({xxx:sss}) is a chained call. To avoid undefined after response.status() we need :
		// - jest.fn() to call each method
		// - mockReturnThis() on status() to return the "this" on which it was invoked
		const response = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		const next = jest.fn();

		// Act
		validateBody(request, response, next);

		// Assert
		expect(response.status).toHaveBeenCalledWith(500);
		expect(response.json).toHaveBeenCalledWith({
			error: "⚠️ Oh oh... Modèle sans schéma ici, à corriger ! ",
		});
		expect(next).not.toHaveBeenCalled();
	});
});
