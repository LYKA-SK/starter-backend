const router = require('express').Router();
const productController = require('../controllers/product.controller');
const customerController = require('../controllers/customer.controller');
const orderController = require('../controllers/order.controller');

/**
 * @openapi
 * /products:
 *   get:
 *     summary: List all products
 *     description: Returns all products. Optionally filter by name (?search=).
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Filter by product name (case-insensitive)
 *     responses:
 *       200:
 *         description: Array of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', productController.listProducts);

/**
 * @openapi
 * /customers/{id}:
 *   get:
 *     summary: Get a customer with their orders
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Customer ID
 *     responses:
 *       200:
 *         description: Customer with orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CustomerWithOrders'
 *       404:
 *         description: Customer not found
 */
router.get('/customers/:id', customerController.getCustomer);

/**
 * @openapi
 * /reports/product-sales:
 *   get:
 *     summary: Product sales report
 *     description: Every product with quantitySold and moneyEarned from non-CANCELLED orders
 *     tags: [Reports]
 *     responses:
 *       200:
 *         description: Sales report array
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesReportItem'
 */
router.get('/reports/product-sales', productController.getSalesReport);

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceOrderInput'
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid quantity
 *       404:
 *         description: Customer or product not found
 *       409:
 *         description: Not enough stock
 */
router.post('/orders', orderController.placeOrder);

/**
 * @openapi
 * /orders/{id}/cancel:
 *   put:
 *     summary: Cancel a PENDING order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order cancelled
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       409:
 *         description: Order is not PENDING
 */
router.put('/orders/:id/cancel', orderController.cancelOrder);

module.exports = router;
