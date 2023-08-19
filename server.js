const app = require('../index');

app.listen(PORT, () => {
    console.log(`App on http://localhost:${PORT}/api or http://localhost:${PORT}/api-docs for the documentation`);
});
