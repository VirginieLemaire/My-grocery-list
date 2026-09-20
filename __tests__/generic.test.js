const Generic = require("../app/models/generic");

describe("Generic - validation du nom de la table", () => {
	// Here we can't pass by HTTP request so we neeed to execute the promise first to catch the error
	it("should reject an unknown table name with a 400 status", async () => {
		// Act
		let error;
		try {
			await Generic.findAll({ modelTableName: "table_bidon" });
		} catch (err) {
			error = err;
		}

		// Assert
		expect(error.status).toBe(400);
		expect(error.message).toBe("erreur : cette table n'existe pas");
	});
});
