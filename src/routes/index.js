const router = require('express').Router();
const productController = require('../controllers/product.controller');
const customerController = require('../controllers/customer.controller');
const orderController = require('../controllers/order.controller');

// S6.1 — list products (optional ?search=)
router.get('/products', productController.listProducts);

// S6.2 — one customer with their orders
router.get('/customers/:id', customerController.getCustomer);

// S6.3 — report: quantity sold and money earned per product
router.get('/reports/product-sales', productController.getSalesReport);

// S7.1 — place an order
router.post('/orders', orderController.placeOrder);

// S7.2 — cancel an order
router.put('/orders/:id/cancel', orderController.cancelOrder);

module.exports = router;
