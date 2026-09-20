module.exports = {
	get: {
		tags: ["Category"],
		summary: "One category details",
		description: "Give informations about one category",
		operationId: "getCategory",
		parameters: [
			{
				name: "categoryId",
				in: "path",
				description: "The id of the category to retrieve",
				required: true,
				schema: {
					type: "integer",
					example: 1,
				},
			},
		],
		responses: {
			200: {
				description: "Successful operation",
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/Category",
						},
					},
				},
			},
			default: {
				$ref: "#/components/responses/UnexpectedError",
			},
		},
	},
	patch: {
		tags: ["Category"],
		summary: "Update a category",
		description:
			"Update one or several fields of an existing category. Only the fields present in the body are changed.",
		operationId: "updateCategory",
		parameters: [
			{
				name: "categoryId",
				in: "path",
				description: "The id of the category to update",
				required: true,
				schema: {
					type: "integer",
					example: 1,
				},
			},
		],
		requestBody: {
			content: {
				"application/json": {
					schema: {
						$ref: "#/components/requestBodies/patchCategory",
					},
				},
			},
		},
		responses: {
			200: {
				description: "Updated. Sends the updated category.",
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/Category",
						},
					},
				},
			},
			400: {
				$ref: "#/components/responses/BadRequest",
			},
			404: {
				$ref: "#/components/responses/NotFound",
			},
			default: {
				$ref: "#/components/responses/UnexpectedError",
			},
		},
	},
	delete: {
		tags: ["Category"],
		summary: "Delete a category",
		description:
			"Delete an existing category. Fails with a 409 if the category is still referenced by an item.",
		operationId: "deleteCategory",
		parameters: [
			{
				name: "categoryId",
				in: "path",
				description: "The id of the category to delete",
				required: true,
				schema: {
					type: "integer",
					example: 1,
				},
			},
		],
		responses: {
			200: {
				description: "Deleted. Sends the deleted category.",
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/Category",
						},
					},
				},
			},
			404: {
				$ref: "#/components/responses/NotFound",
			},
			409: {
				$ref: "#/components/responses/Conflict",
			},
			default: {
				$ref: "#/components/responses/UnexpectedError",
			},
		},
	},
};
