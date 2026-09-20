const { z } = require("zod");
const { name } = require("./common");

/**
 * Schema factory for entities with a single required "name" field
 * (brand, category, shelf)
 * @returns {{create: import("zod").ZodType, update: import("zod").ZodType}}
 */
module.exports = function namedEntitySchema() {
	const create = z.object({ name }).strict();
	const update = create.partial();
	return { create, update };
};
