const request = require("supertest");
const app = require("../app/app");

let createdId = 0;

describe("POST /api/shelves", () => {
	it("should return the shelf created", async () => {
		// Arrange
		const payload = { name: "test" };
		// Act
		const response = await request(app).post("/api/shelves").send(payload);
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

describe("GET /api/shelves", () => {
	it("should return an array of shelves", async () => {
		// Act
		const response = await request(app).get("/api/shelves/");

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

describe(`GET /api/shelves/:id`, () => {
	it("should return the shelf requested", async () => {
		// Act
		const response = await request(app).get(`/api/shelves/${createdId}`);

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

describe("PATCH /api/shelves/:id", () => {
	it("should return the shelf updated", async () => {
		// Act
		const response = await request(app)
			.patch(`/api/shelves/${createdId}`)
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
