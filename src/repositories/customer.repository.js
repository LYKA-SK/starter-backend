const prisma = require('../prisma');

async function getCustomerWithOrders(id) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      orders: {
        include: { product: true },
      },
    },
  });
}

module.exports = { getCustomerWithOrders };