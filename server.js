const { app } = require("./app");
require('dotenv').config();


if (process.env.NODE_ENV === "development" || process.env.NODE_EN === "test") {
    app.listen(3000, () => {
        console.log(
            "server is running on http://localhost:3000"
        );
    });
} else {
    app.listen(8080, () => {
        console.log(
            "server is running on http://localhost:8080"
        );
    });
}