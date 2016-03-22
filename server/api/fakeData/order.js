import faker from 'faker';

faker.locale = 'en_US';

const getOrder = () => ({
  id: faker.random.uuid(),
  bgImgUrl: faker.image.city(),
  price: faker.commerce.price(),
  weight: faker.random.number(),
  deadline: faker.date.future(),
  pledge: faker.commerce.price(),
  requests: faker.random.number(),
  deliveryTime: faker.date.recent(),
  delivDateNoun: faker.date.recent(),
  serviceType: faker.commerce.department(),
  description: faker.commerce.productName(),
  fromStreetAddress: faker.address.streetAddress(),
  fromSecondaryAddress: faker.address.secondaryAddress(),
  fromCity: faker.address.city(),
  fromState: faker.address.state(),
  fromStateAbbr: faker.address.stateAbbr(),
  fromCountry: faker.address.country(),
  fromZipCode: faker.address.zipCode(),
  toStreetAddress: faker.address.streetAddress(),
  toSecondaryAddress: faker.address.secondaryAddress(),
  toCity: faker.address.city(),
  toState: faker.address.state(),
  toStateAbbr: faker.address.stateAbbr(),
  toCountry: faker.address.country(),
  toZipCode: faker.address.zipCode(),
  driverRating: 3,
  driverRatingCount: 150,
  driverDriverImg: faker.image.avatar(),
  driverContactPhone: faker.phone.phoneNumber(),
  driverDriver: `${faker.name.lastName()}, ${faker.name.firstName()}`,
});

const getOrders = (n) => new Promise((resolve) => {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(getOrder());
  }
  resolve(results);
});

module.exports = {
  getOrder,
  getOrders,
};
