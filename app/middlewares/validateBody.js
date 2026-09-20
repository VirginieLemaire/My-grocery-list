const schemas = require("../schemas");

module.exports = {
	/**
	 * Validates request.body against the zod schema of request.modelName
	 * (set beforehand by addModelInRequest), using the "create" schema for
	 * POST and the "update" (partial) schema for PATCH.
	 * @param {*} request
	 * @param {*} response
	 * @param {*} next
	 * @returns 400 JSON error if the payload doesn't match the schema
	 */
	validateBody(request, response, next) {
		const entitySchemas = schemas[request.modelName];

		if (!entitySchemas) {
			// avoid silent error
			response.status(500).json({
				error: "⚠️ Oh oh... Modèle sans schéma ici, à corriger ! ",
			});
			return;
		}

		const schema = request.params.id
			? entitySchemas.update
			: entitySchemas.create;
		const result = schema.safeParse(request.body);

		if (!result.success) {
			response.status(400).json({
				error: result.error.issues
					.map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
					.join(", "),
			});
			return;
		}

		request.body = result.data;
		next();
	},
};
