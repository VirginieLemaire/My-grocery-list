require("@dotenvx/dotenvx").config({
	logLevel: "error",
	ignore: ["MISSING_ENV_FILE"],
});
//connection to DB with pooling
const { Pool } = require("pg");
const { logger } = require("./logger");

let DB_URL;
if (process.env.NODE_ENV === "test") {
	DB_URL = process.env.DATABASE_TEST_URL;
} else {
	DB_URL = process.env.DATABASE_URL;
}

const config = { connectionString: DB_URL };

if (process.env.DATABASE_SSL === "true") {
	config.ssl = {
		rejectUnauthorized: true,
	};
}

const pool = new Pool(config);

pool.on("error", (err) => {
	logger.fatal({ err }, "Erreur rencontrée au niveau du pool pg");
});

module.exports = pool;
