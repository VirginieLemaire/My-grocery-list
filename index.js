// REQUIRE
require('dotenv').config();
const app = require('./app/app');

const PORT = process.env.PORT || 3001;

// SERVER
app.listen(PORT, () => {
    console.log(`App on ${process.env.BASE_URL}:${PORT}/api or ${process.env.BASE_URL}:${PORT}/api-docs for the documentation`);
});
