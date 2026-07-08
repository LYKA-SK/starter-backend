const prisma = require('../prisma');
const httpError = require('../utils/httpError');

async function placeOrder(customerId, productId, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw httpError(400, 'Quantity must be a whole number greater than 0');
  }

  const customer = await prisma.customer.findUnique({ where: { id: customerId } });
  if (!customer) {
    throw httpError(404, 'Customer not found');
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw httpError(404, 'Product not found');
  }

  if (product.stock < quantity) {
    throw httpError(409, 'Not enough stock');
  }

  const totalPrice = quantity * product.price;

  const [order] = await prisma.$transaction([
    prisma.order.create({
      data: {
        customerId,
        productId,
        quantity,
        totalPrice,
      },
    }),
    prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    }),
  ]);

  return order;
}

async function cancelOrder(orderId) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: true },
  });

  if (!order) {
    throw httpError(404, 'Order not found');
  }

  if (order.status !== 'PENDING') {
    throw httpError(409, 'Only PENDING orders can be cancelled');
  }

  const [updatedOrder] = await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    }),
    prisma.product.update({
      where: { id: order.productId },
      data: { stock: { increment: order.quantity } },
    }),
  ]);

  return updatedOrder;
}

module.exports = { placeOrder, cancelOrder };
