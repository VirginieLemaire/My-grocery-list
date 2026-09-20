const pino = require("pino");

const config = {};

if (process.env.NODE_ENV === "development") {
	config.transport = {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	};
}

const logger = pino(config);

module.exports = { logger };
