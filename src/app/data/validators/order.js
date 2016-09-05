
export const validate = (values) => {
  const errors = [];
  const {
    idAddressPickup,
    pickUpDate,
    idAddressDeliver,
    deliveryDate,
    idClientPaymentInfo,
    services,
  } = values;
  if (!idAddressPickup) {
    errors.push('Por favor agrega o selecciona una direccion para recojer');
  }
  if (!pickUpDate) {
    errors.push('Por favor ingresa una hora para recojer');
  }
  if (!idAddressDeliver) {
    errors.push('Por favor agrega o selecciona una direccion para entrega');
  }
  if (!deliveryDate) {
    errors.push('Por favor ingresa una hora para entrega');
  }
  if (!idClientPaymentInfo) {
    errors.push('Por favor agrega o selecciona metodo de pago');
  }
  if (services.length < 1) {
    errors.push('Por favor agrega un servicio');
  }
  return errors;
};

export default validate;
