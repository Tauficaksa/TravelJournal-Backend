const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Travel Journal API",
            version: "1.0.0",
            description: "API documentation for Travel Journal App",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.js"], // Make sure all routes are included
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
