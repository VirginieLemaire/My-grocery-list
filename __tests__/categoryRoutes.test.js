const request = require("supertest");
const app = require("../app/app");

let createdId = 0;

describe("POST /api/categories", () => {
	it("should return the category created", async () => {
		// Arrange
		const payload = { name: "test" };
		// Act
		const response = await request(app).post("/api/categories").send(payload);
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

describe("GET /api/categories", () => {
	it("should return an array of categories", async () => {
		// Act
		const response = await request(app).get("/api/categories/");

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

describe(`GET /api/categories/:id`, () => {
	it("should return the category requested", async () => {
		// Act
		const response = await request(app).get(`/api/categories/${createdId}`);

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

describe("PATCH /api/categories/:id", () => {
	it("should return the category updated", async () => {
		// Act
		const response = await request(app)
			.patch(`/api/categories/${createdId}`)
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

describe("POST /api/categories without a name", () => {
	it("should return a 400 JSON error", async () => {
		// Act
		const response = await request(app).post("/api/categories").send({});

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("POST /api/categories with a name of the wrong type", () => {
	it("should return a 400 JSON error", async () => {
		// Act
		const response = await request(app)
			.post("/api/categories")
			.send({ name: 123 });

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("PATCH /api/categories/:id with a name of the wrong type", () => {
	it("should return a 400 JSON error", async () => {
		// Arrange
		const categoryResponse = await request(app)
			.post("/api/categories")
			.send({ name: "category to patch invalidly" });

		// Act
		const response = await request(app)
			.patch(`/api/categories/${categoryResponse.body.id}`)
			.send({ name: 123 });

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("DELETE /api/categories/:id when the category is still used by an item", () => {
	it("should return a 409 JSON error and not delete the category", async () => {
		// Arrange
		const categoryResponse = await request(app)
			.post("/api/categories")
			.send({ name: "category used by an item" });
		const categoryId = categoryResponse.body.id;
		await request(app)
			.post("/api/items")
			.send({ name: "item using the category", category_id: categoryId });

		// Act
		const response = await request(app).delete(`/api/categories/${categoryId}`);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(409);
		expect(response.body).toEqual({ error: expect.any(String) });

		const stillThereResponse = await request(app).get(
			`/api/categories/${categoryId}`,
		);
		expect(stillThereResponse.status).toBe(200);
	});
});

describe("DELETE /api/categories/:id", () => {
	it("should return an object confirming deletion for this id", async () => {
		// Act
		const response = await request(app).delete(`/api/categories/${createdId}`);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: createdId,
				name: "modified test",
			}),
		);

		const deletedResponse = await request(app).get(
			`/api/categories/${createdId}`,
		);
		expect(deletedResponse.status).toBe(404);
	});
});

describe("DELETE /api/categories/:idInexistant", () => {
	it("should return a 404 when the id doesn't exist with a JSON error", async () => {
		// Act
		const response = await request(app).delete(
			`/api/categories/${createdId + 999999}`,
		);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});
