import faker from 'faker'

const getFakeOrder = () => {
  faker.locale = 'en_US'
  return {
    pickupAddress: {
      city: faker.address.city(),
      streetName: faker.address.streetName(),
      streetAddress: faker.address.streetAddress(),
      secondaryAddress: faker.address.secondaryAddress(),
      country: faker.address.country(),
      countryCode: faker.address.countryCode(),
      state: faker.address.state(),
      stateAbbr: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode()
    },
    deliveryAddress: {
      city: faker.address.city(),
      streetName: faker.address.streetName(),
      streetAddress: faker.address.streetAddress(),
      secondaryAddress: faker.address.secondaryAddress(),
      country: faker.address.country(),
      countryCode: faker.address.countryCode(),
      state: faker.address.state(),
      stateAbbr: faker.address.stateAbbr(),
      zipCode: faker.address.zipCode()
    },
    serviceDetails: {
      description: faker.commerce.productName(),
      price: faker.commerce.price(),
      serviceType: faker.commerce.department(),
      orderDate: faker.date.recent(),
      estimateDate: faker.date.future(),
      contactPhone: faker.phone.phoneNumber()
    },
    paymentDetails: {
      transactionId: faker.finance.account(),
      last4digits: faker.finance.mask()
    }
  }
}

const getNOrders = (n) => {
  return new Promise((resolve, reject) => {
    let results = []
    for (var i = 0; i < n; i++) {
      results.push(getFakeOrder())
    }
    resolve(results)
  })
}

module.exports = {
  getFakeOrder: getFakeOrder,
  getNOrders: getNOrders
}
