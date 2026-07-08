const customerRepository = require('../repositories/customer.repository');

async function getCustomer(req, res, next) {
  try {
    const customer = await customerRepository.getCustomerWithOrders(Number(req.params.id));
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCustomer };
