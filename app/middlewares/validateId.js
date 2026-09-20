module.exports = {
	/**
	 * Validates id is an integer
	 * @param {*} request
	 * @param {*} response
	 * @param {*} next
	 * @returns 400 JSON error if the payload doesn't match integer
	 */
	validateId: (request, response, next) => {
		const id = Number(request.params?.id);

		const isValid = Number.isInteger(id) && id > 0;

		if (!isValid) {
			response
				.status(400)
				.json({ error: "l'id doit être au format entier. Exemple : 1" });
			return;
		}
		next();
	},
};
