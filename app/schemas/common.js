const { z } = require("zod");

const name = z.string().trim().min(1, "name est requis");

module.exports = { name };
