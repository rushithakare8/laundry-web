export const int = (val) => parseInt(val, 10);

// ------------------------------------
// UPDATE CART PRICE
// ------------------------------------
export const updateCartPriceAction = () => ({ type: 'UPDATE_CART_PRICE' });

export const updateCartPriceReducer = (cart) => {
  let total = 0;
  let subtotal = 0;
  const { selectedServiceType } = cart.selectedService;
  if (selectedServiceType) {
    const { specs } = selectedServiceType;
    const baseIncrement = specs ? specs.reduce((sInc, spec) => {
      let specPrice = 0;
      if (spec.primarySpec) {
        const optionPrice = spec.option ? spec.option.specPrice : 0;
        specPrice = (spec.price + optionPrice) * spec.amount;
      }
      return sInc + specPrice;
    }, 0) : 0;
    const specIncrement = specs ? specs.reduce((sInc, spec) => {
      let specInc = 0;
      if (!spec.primarySpec) {
        specInc = spec.option ? spec.option.serviceIncrement : 0;
        specInc *= spec.amount;
      }
      return sInc + specInc;
    }, 0) : 0;
    const specPriceInc = specs ? specs.reduce((sInc, spec) => {
      let specPrice = 0;
      if (!spec.primarySpec) {
        const optionPrice = spec.option ? spec.option.specPrice : 0;
        specPrice = (spec.price + optionPrice) * spec.amount;
      }
      return sInc + specPrice;
    }, 0) : 0;
    total = selectedServiceType.price;
    total += baseIncrement;
    subtotal = total + specPriceInc;
    total = specIncrement > 0 ? total * (1 + (specIncrement / 100)) : total;
    total += specPriceInc;
  }
  return Object.assign({}, cart, { total, subtotal });
};

export const updateCartSpecAction = ({ idSpecs, key, amount }) => ({
  type: 'UPDATE_CART_SPEC',
  idSpecs,
  key,
  amount,
});

export const updateCartSpecReducer = (cart, action) => {
  const { selectedService } = cart;
  const { selectedServiceType } = selectedService;
  const specs = selectedServiceType.specs && selectedServiceType.specs.map(spec => {
    let option = spec.option || (spec.options && spec.options[spec.idSpecs][0]);
    let amount = !spec.optional ? 1 : 0;
    if (int(spec.idSpecs) === int(action.idSpecs)) {
      option = action.key ? spec.options[spec.idSpecs].filter(opt => int(opt.key) === int(action.key))[0] : option;
      amount = int(action.amount) || spec.amount || amount;
    }
    return Object.assign({}, spec, {
      option,
      amount,
    });
  });
  return Object.assign({}, cart, {
    selectedService: Object.assign({}, selectedService, {
      selectedServiceType: Object.assign({}, selectedServiceType, {
        specs,
      }),
    }),
  });
};

export const updateCartSpec = ({ idSpecs, key, amount }) => (dispatch) => {
  dispatch(updateCartSpecAction({ idSpecs, key, amount }));
  dispatch(updateCartPriceAction());
};

// ------------------------------------------------------------------------
// ADD THE SELECTED SERVICE TYPE TO THE CART INCLUDING INITIAL SPECS
// ------------------------------------------------------------------------
export const updateCartServiceTypeAction = (idServiceType) => ({
  type: 'UPDATE_CART_SERVICE_TYPE',
  idServiceType,
});

export const updateCartServiceTypeReducer = (cart, action) => {
  const { selectedService } = cart;
  const selectedServiceType = selectedService.serviceTypes.filter(st => int(st.idServiceType) === int(action.idServiceType))[0];
  const specs = selectedServiceType.specs && selectedServiceType.specs.map(spec => {
    const option = spec.options && spec.options[spec.idSpecs][0];
    const amount = !spec.optional ? 1 : 0;
    return Object.assign({}, spec, {
      option,
      amount,
    });
  });
  return Object.assign({}, cart, {
    selectedService: Object.assign({}, selectedService, {
      selectedServiceType: Object.assign({}, selectedServiceType, {
        specs,
      }),
    }),
  });
};

// ------------------------------------------------------------------------
// ADD THE SELECTED SERVICE TO THE CART
// ------------------------------------------------------------------------
export const updateCartServiceAction = (selectedService) => ({
  type: 'UPDATE_CART_SERVICE',
  selectedService,
});

export const updateCartServiceReducer = (cart, action) => Object.assign({}, cart, {
  selectedService: action.selectedService,
});

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  UPDATE_CART_PRICE: updateCartPriceReducer,
  UPDATE_CART_SERVICE_TYPE: updateCartServiceTypeReducer,
  UPDATE_CART_SERVICE: updateCartServiceReducer,
  UPDATE_CART_SPEC: updateCartSpecReducer,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { total: 0, subtotal: 0 };
export default function servicesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
