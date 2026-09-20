const request = require("supertest");
const app = require("../app/app");

let createdId = 0;

describe("Cycle de vie normal d'un item", () => {
	describe("POST /api/items", () => {
		it("should return the item created", async () => {
			// Arrange
			const payload = { name: "test" };
			// Act
			const response = await request(app).post("/api/items").send(payload);
			createdId = response.body.id;

			// Assert
			expect(response.status).toBe(201);
			expect(response.body).toEqual(
				expect.objectContaining({
					id: expect.any(Number),
					name: "test",
				}),
			);
		});
	});

	describe("GET /api/items", () => {
		it("should return an array of items", async () => {
			// Act
			const response = await request(app).get("/api/items/");

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: createdId,
						name: "test",
					}),
				]),
			);
		});
	});

	describe(`GET /api/items/:id`, () => {
		it("should return the item requested", async () => {
			// Act
			const response = await request(app).get(`/api/items/${createdId}`);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.objectContaining({
					id: createdId,
					name: "test",
				}),
			);
		});
	});

	describe("PATCH /api/items/:id", () => {
		it("should return the item updated", async () => {
			// Act
			const response = await request(app)
				.patch(`/api/items/${createdId}`)
				.send({ name: "modified test" });

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.objectContaining({
					id: createdId,
					name: "modified test",
				}),
			);
		});
	});

	describe("DELETE /api/items/:id", () => {
		it("should return an object confirming deletion for this id", async () => {
			// Act
			const response = await request(app).delete(`/api/items/${createdId}`);

			//Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.objectContaining({
					id: createdId,
					name: "modified test",
				}),
			);
		});
	});
});

describe("Filtres /api/items/filter", () => {
	describe("GET /api/items/filter?shelf=frais", () => {
		it('should return an array of items for the shelf "frais"', async () => {
			// Act
			const response = await request(app).get("/api/items/filter?shelf=frais");
			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						shelf: expect.stringMatching("Frais"),
					}),
				]),
			);
		});
	});

	describe("GET /api/items/filter (no query params)", () => {
		it("should return all items instead of erroring out", async () => {
			// Act
			const response = await request(app).get("/api/items/filter");
			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(200);
			expect(response.body).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
					}),
				]),
			);
		});
	});
});

describe("Cas d'erreur", () => {
	describe("POST /api/items with an empty body", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const payload = {};

			//  Act
			const response = await request(app).post("/api/items").send(payload);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("PATCH /api/items/:idInexistant", () => {
		it("should return a 404 when the id doesn't exists with a JSON error", async () => {
			// Act
			const response = await request(app)
				.patch(`/api/items/${createdId + 999999}`)
				.send({
					name: "modified test",
				});

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("POST /api/items without a name", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const payload = { details: "no name given" };

			// Act
			const response = await request(app).post("/api/items").send(payload);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("POST /api/items with a name of the wrong type", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const payload = { name: 123 };

			// Act
			const response = await request(app).post("/api/items").send(payload);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("POST /api/items with a brand_id of the wrong type", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const payload = { name: "test", brand_id: "not a number" };

			// Act
			const response = await request(app).post("/api/items").send(payload);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("POST /api/items with an unknown field", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const payload = { name: "test", unknown_field: "nope" };

			// Act
			const response = await request(app).post("/api/items").send(payload);

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});

	describe("PATCH /api/items/:id with a name of the wrong type", () => {
		it("should return a 400 JSON error", async () => {
			// Arrange
			const itemResponse = await request(app)
				.post("/api/items")
				.send({ name: "item to patch invalidly" });

			// Act
			const response = await request(app)
				.patch(`/api/items/${itemResponse.body.id}`)
				.send({ name: 123 });

			// Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(400);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});
	describe("DELETE /api/items/:idInexistant", () => {
		it("should return a 404 when the id doesn't exists with a JSON error", async () => {
			// Act
			const response = await request(app).delete(
				`/api/items/${createdId + 999999}`,
			);

			//Assert
			expect(response.headers["content-type"]).toMatch(/json/);
			expect(response.status).toBe(404);
			expect(response.body).toEqual({ error: expect.any(String) });
		});
	});
});
