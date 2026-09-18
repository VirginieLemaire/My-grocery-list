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
