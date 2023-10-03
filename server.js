// Server startup script
const server = require("./app");
require('dotenv').config();


if (process.env.NODE_ENV === "development"||process.env.NODE_EN==="test") {
    server.listen(3000, () => {
        console.log(
            "server is running on http://localhost:3000"
        );
    });
} else {
    server.listen(8080, () => {
        console.log(
            "server is running on http://localhost:8080"
        );
    });
}