const orderService = require('../services/order.service');

async function placeOrder(req, res, next) {
  try {
    const { customerId, productId, quantity } = req.body;
    const order = await orderService.placeOrder(
      Number(customerId),
      Number(productId),
      Number(quantity)
    );
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const order = await orderService.cancelOrder(Number(req.params.id));
    res.json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { placeOrder, cancelOrder };
