import faker from 'faker';

faker.locale = 'en_US';

const getSpec = () => ({
  idSpec: faker.random.uuid(),
  price: faker.commerce.price(),
  description: faker.commerce.productName(),
});

const getSpecs = (n) => new Promise((resolve) => {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(getSpec());
  }
  resolve(results);
});

module.exports = {
  getSpec,
  getSpecs,
};
