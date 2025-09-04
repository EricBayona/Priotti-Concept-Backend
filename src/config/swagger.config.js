import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Priotti Concept API",
            version: "1.0.0",
            description: "Documentación de la API del e-commerce Priotti Concept",
        },
        servers: [
            {
                url: "http://localhost:8080/api",
                description: "Servidor local",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/docs/*.yaml"],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
