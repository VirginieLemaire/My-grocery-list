const request = require("supertest");
const app = require("../app/app");

let createdId = 0;

describe("POST /api/brands", () => {
	it("should return the brand created", async () => {
		// Arrange
		const payload = { name: "test" };
		// Act
		const response = await request(app).post("/api/brands").send(payload);
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

describe("GET /api/brands", () => {
	it("should return an array of brands", async () => {
		// Act
		const response = await request(app).get("/api/brands/");

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

describe(`GET /api/brands/:id`, () => {
	it("should return the brand requested", async () => {
		// Act
		const response = await request(app).get(`/api/brands/${createdId}`);

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

describe("PATCH /api/brands/:id", () => {
	it("should return the brand updated", async () => {
		// Act
		const response = await request(app)
			.patch(`/api/brands/${createdId}`)
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

describe("DELETE /api/brands/:id when the brand is still used by an item", () => {
	it("should return a 409 JSON error and not delete the brand", async () => {
		// Arrange
		const brandResponse = await request(app)
			.post("/api/brands")
			.send({ name: "brand used by an item" });
		const brandId = brandResponse.body.id;
		await request(app)
			.post("/api/items")
			.send({ name: "item using the brand", brand_id: brandId });

		// Act
		const response = await request(app).delete(`/api/brands/${brandId}`);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(409);
		expect(response.body).toEqual({ error: expect.any(String) });

		const stillThereResponse = await request(app).get(
			`/api/brands/${brandId}`,
		);
		expect(stillThereResponse.status).toBe(200);
	});
});

describe("DELETE /api/brands/:id", () => {
	it("should return an object confirming deletion for this id", async () => {
		// Act
		const response = await request(app).delete(`/api/brands/${createdId}`);

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
			`/api/brands/${createdId}`,
		);
		expect(deletedResponse.status).toBe(404);
	});
});

describe("DELETE /api/brands/:idInexistant", () => {
	it("should return a 404 when the id doesn't exist with a JSON error", async () => {
		// Act
		const response = await request(app).delete(
			`/api/brands/${createdId + 999999}`,
		);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});
