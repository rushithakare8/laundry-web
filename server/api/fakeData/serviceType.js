import faker from 'faker';
import { getSpecs } from './spec';

faker.locale = 'en_US';

const getServiceType = () => new Promise((resolve) => {
  getSpecs(3).then((specs) => {
    resolve({
      idServiceType: faker.random.uuid(),
      description: faker.commerce.productName(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      specs,
    });
  });
});

const getServiceTypes = (n) => new Promise((resolve) => {
  const results = [];
  for (let i = 0; i < n; i++) {
    getServiceType().then((serviceType) => {
      results.push(serviceType);
    });
  }
  resolve(results);
});

module.exports = {
  getServiceType,
  getServiceTypes,
};
