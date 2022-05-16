/**
 * Swagger Configuration
 */
export const SwaggerConfig = {
    swaggerDefinition: {
        openapi: "3.0.0",
        consumes: ["application/json"],
        produces: ["application/json"],
        info: {
            title: "",
            description: "API documentation",
            contact: {
                name: "",
            },
            version: "1.0.0",
        },
    },
    apis: ["src/api/routes/*.ts", "src/api/*.ts"],
};
