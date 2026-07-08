const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Store API',
      version: '1.0.0',
      description: 'A small shop backend API for managing products, customers, and orders.',
    },
    servers: [{ url: '/api' }],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Instant Noodles Box' },
            price: { type: 'integer', example: 1 },
            stock: { type: 'integer', example: 50 },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        CustomerWithOrders: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            orders: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderWithProduct' },
            },
          },
        },
        OrderWithProduct: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            customerId: { type: 'integer' },
            productId: { type: 'integer' },
            quantity: { type: 'integer' },
            totalPrice: { type: 'integer' },
            status: { type: 'string', enum: ['PENDING', 'PAID', 'CANCELLED'] },
            orderDate: { type: 'string', format: 'date-time' },
            product: { $ref: '#/components/schemas/Product' },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            customerId: { type: 'integer' },
            productId: { type: 'integer' },
            quantity: { type: 'integer' },
            totalPrice: { type: 'integer' },
            status: { type: 'string', enum: ['PENDING', 'PAID', 'CANCELLED'] },
            orderDate: { type: 'string', format: 'date-time' },
          },
        },
        PlaceOrderInput: {
          type: 'object',
          required: ['customerId', 'productId', 'quantity'],
          properties: {
            customerId: { type: 'integer', example: 3 },
            productId: { type: 'integer', example: 3 },
            quantity: { type: 'integer', example: 2 },
          },
        },
        SalesReportItem: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            quantitySold: { type: 'integer', example: 15 },
            moneyEarned: { type: 'integer', example: 15 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

module.exports = swaggerJsdoc(options);
