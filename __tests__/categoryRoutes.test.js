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
