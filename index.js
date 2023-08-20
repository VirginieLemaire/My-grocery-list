// REQUIRE
require('dotenv').config();
const app = require('./app/app');

const PORT = process.env.PORT || 3001;

// SERVER
app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}/api or http://localhost:${PORT}/api-docs for the documentation`);
});
