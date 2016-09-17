
export const validate = (values) => {
  const errors = {};

  if (!values.address) {
    errors.address = 'Please enter an address';
  }
  if (!values.city) {
    errors.city = 'Please enter a city';
  }
  if (!values.state) {
    errors.state = 'Please enter a state';
  }
  if (!values.country) {
    errors.country = 'Please enter a country';
  }
  if (!values.zipcode) {
    errors.zipcode = 'Please enter a zipcode';
  }
  return errors;
};

export default validate;
