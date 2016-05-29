
export const validate = (values) => {
  const errors = [];
  const {
    idAddressPickup,
    pickupTime,
    idAddressDeliver,
    deliveryTime,
    idClientPaymentInfo,
    services,
  } = values;
  if (!Boolean(idAddressPickup)) {
    errors.push('Por favor agrega o selecciona una direccion para recojer');
  }
  if (!Boolean(pickupTime)) {
    errors.push('Por favor ingresa una hora para recojer');
  }
  if (!Boolean(idAddressDeliver)) {
    errors.push('Por favor agrega o selecciona una direccion para entrega');
  }
  if (!Boolean(deliveryTime)) {
    errors.push('Por favor ingresa una hora para entrega');
  }
  if (!Boolean(idClientPaymentInfo)) {
    errors.push('Por favor agrega o selecciona metodo de pago');
  }
  if (services.length < 1) {
    errors.push('Por favor agrega un servicio');
  }
  return errors;
};
