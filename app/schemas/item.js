const { z } = require("zod");
const { name } = require("./common");

const foreignKeyId = z.number().int().positive().nullish();

const create = z
	.object({
		name,
		details: z.string().trim().min(1).nullish(),
		brand_id: foreignKeyId,
		category_id: foreignKeyId,
		shelf_id: foreignKeyId,
	})
	.strict();

const update = create.partial();

module.exports = { create, update };
