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

describe("POST /api/shelves without a name", () => {
	it("should return a 400 JSON error", async () => {
		// Act
		const response = await request(app).post("/api/shelves").send({});

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("POST /api/shelves with a name of the wrong type", () => {
	it("should return a 400 JSON error", async () => {
		// Act
		const response = await request(app)
			.post("/api/shelves")
			.send({ name: 123 });

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("PATCH /api/shelves/:id with a name of the wrong type", () => {
	it("should return a 400 JSON error", async () => {
		// Arrange
		const shelfResponse = await request(app)
			.post("/api/shelves")
			.send({ name: "shelf to patch invalidly" });

		// Act
		const response = await request(app)
			.patch(`/api/shelves/${shelfResponse.body.id}`)
			.send({ name: 123 });

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});

describe("DELETE /api/shelves/:id when the shelf is still used by an item", () => {
	it("should return a 409 JSON error and not delete the shelf", async () => {
		// Arrange
		const shelfResponse = await request(app)
			.post("/api/shelves")
			.send({ name: "shelf used by an item" });
		const shelfId = shelfResponse.body.id;
		await request(app)
			.post("/api/items")
			.send({ name: "item using the shelf", shelf_id: shelfId });

		// Act
		const response = await request(app).delete(`/api/shelves/${shelfId}`);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(409);
		expect(response.body).toEqual({ error: expect.any(String) });

		const stillThereResponse = await request(app).get(
			`/api/shelves/${shelfId}`,
		);
		expect(stillThereResponse.status).toBe(200);
	});
});

describe("DELETE /api/shelves/:id", () => {
	it("should return an object confirming deletion for this id", async () => {
		// Act
		const response = await request(app).delete(`/api/shelves/${createdId}`);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: createdId,
				name: "modified test",
			}),
		);

		const deletedResponse = await request(app).get(`/api/shelves/${createdId}`);
		expect(deletedResponse.status).toBe(404);
	});
});

describe("DELETE /api/shelves/:idInexistant", () => {
	it("should return a 404 when the id doesn't exist with a JSON error", async () => {
		// Act
		const response = await request(app).delete(
			`/api/shelves/${createdId + 999999}`,
		);

		// Assert
		expect(response.headers["content-type"]).toMatch(/json/);
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: expect.any(String) });
	});
});
