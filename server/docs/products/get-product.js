module.exports = {
  get: {
    tags: ["product"],
    description: "get all products",
    operationId: "getProducts",
    parameters: [
      {
        name: "q",
        in: "query",
        schema: {
          type: "string",
          description: "search for specific product",
          example: "q=hello",
        },
        description: "search for ",
      },
      {
        name: "page",
        in: "query",
        schema: {
          type: "number",
          description: "page of products",
          example: "page=2",
        },
        description: "get cpecific page of products ",
      },
    ],
    responses: {
      200: {
        description: "one product",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/product",
              },
            },
          },
        },
      },
    },
  },
};
