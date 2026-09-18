const request = require("supertest");
const app = require("../app/app");

describe("GET /api/:modelName with an unknown model name", () => {
	it("should return a 404 JSON error, not plain text", async () => {
		// Act
		const response = await request(app).get("/api/454cdcdcd");

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("GET a route matching no route at all", () => {
	it("should return a 404 JSON error", async () => {
		// Act
		const response = await request(app).get("/api/a/b/c");

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("GET a real endpoint should not send a 404 status", () => {
	it("should not return a 404 code", async () => {
		// Act
		const response = await request(app).get("/api/items");

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).not.toBe(404);
	});
});
