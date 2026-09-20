// REQUIRE
require("@dotenvx/dotenvx").config({
	logLevel: "error",
	ignore: ["MISSING_ENV_FILE"],
});
const express = require("express");
const router = require("./router");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const {
	swaggerSpecifications,
	cssOptions,
} = require("../doc/API-documentation/swaggerDocs");
const helmet = require("helmet");
const { logger } = require("./logger");

// USE
const app = express();

app.use(helmet());

// Sets up CORS, allowed origin defined by environment.
// The cors package treats `origin: undefined` (or `false`) as "allow
// all origins": we pass an empty array by default instead, which
// blocks everything, rather than risking CORS wide open if
// CORS_ORIGIN isn't set.
const corsOptions = {
	origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN : [],
};
app.use(cors(corsOptions));

// body-parser for json
app.use(express.json());

// swagger documentation
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpecifications, cssOptions),
);

// ROUTER
app.use("/api", router);

// Centralized error handler.
// Express 5 already catches rejected promises from async routes on its
// own and forwards them here via next(error): no more try/catch needed
// in every controller. We still keep this middleware "on top of" the
// native handling, because Express's default handler returns HTML
// (whereas this API answers in JSON everywhere else) and can leak the
// stack trace to the client if NODE_ENV isn't explicitly set to
// "production" (which this project doesn't guarantee).
app.use((error, request, response, _next) => {
	const context = {
		err: error,
		status: error.status,
		method: request.method,
		url: request.originalUrl,
	};

	if (error.status) {
		// operational error: deliberately thrown by the app (validation, conflict...), not a bug
		logger.warn(context, "Erreur applicative gérée");
	} else {
		logger.error(context, "Erreur inattendue non gérée par l'application");
	}

	const jsonResponse = error.status
		? { error: error.errors || error.message }
		: { error: "Erreur interne du serveur" };
	response.status(error.status || 500).json(jsonResponse);
});

module.exports = app;
