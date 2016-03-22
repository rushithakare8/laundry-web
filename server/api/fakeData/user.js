import faker from 'faker';

faker.locale = 'en_US';

const getAddress = () => ({
  idAddress: faker.random.uuid(),
  address: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
});

const getAddresses = (n) => new Promise((resolve) => {
  const results = [];
  for (let i = 0; i < n; i++) {
    results.push(getAddress());
  }
  resolve(results);
});

const getUserData = () => new Promise((resolve) => {
  const user = {};
  getAddresses(3).then((addresses) => {
    // user.addresses = addresses;
    user.pointsMissing = 1500;
    user.pointsCompleted = 70;
    resolve(user);
  });
});

module.exports = {
  getAddress,
  getUserData,
  getAddresses,
};
