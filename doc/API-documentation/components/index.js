// schemas
const Item = require("./schemas/item");
const Category = require("./schemas/category");
const Shelf = require("./schemas/shelf");
const Brand = require("./schemas/brand");
// requestBodies
const { postItem, patchItem } = require("./requestBodies/item");
const { postShelf, patchShelf } = require("./requestBodies/shelf");
const { postCategory, patchCategory } = require("./requestBodies/category");
const { postBrand, patchBrand } = require("./requestBodies/brand");

module.exports = {
	schemas: {
		Item,
		Items: {
			type: "array",
			items: {
				$ref: "#/components/schemas/Item",
			},
		},
		Category,
		Categories: {
			type: "array",
			items: {
				$ref: "#/components/schemas/Category",
			},
		},
		Shelf,
		Shelves: {
			type: "array",
			items: {
				$ref: "#/components/schemas/Shelf",
			},
		},
		Brand,
		Brands: {
			type: "array",
			items: {
				$ref: "#/components/schemas/Brand",
			},
		},
		Error: {
			type: "object",
			required: ["error"],
			properties: {
				error: {
					type: "string",
					example: "Endpoint non trouvé",
				},
			},
		},
	},
	requestBodies: {
		postItem,
		patchItem,
		postCategory,
		patchCategory,
		postShelf,
		patchShelf,
		postBrand,
		patchBrand,
	},
	responses: {
		BadRequest: {
			description:
				"Invalid request: empty body, payload failing validation, or non-numeric id",
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/Error",
					},
				},
			},
		},
		NotFound: {
			description: "No resource found for this id",
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/Error",
					},
				},
			},
		},
		Conflict: {
			description: "The resource is still referenced by another resource",
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/Error",
					},
				},
			},
		},
		UnexpectedError: {
			description: "unexpected error",
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/schemas/Error",
					},
				},
			},
		},
	},
};
