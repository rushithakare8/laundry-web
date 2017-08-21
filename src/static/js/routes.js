import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './routes/data/configureStore';
import {
  TERSUS_POSITION,
  TERSUS_ADDRESS,
} from './routes/data/constants/utils';
import Routes from './routes/Routes';

const initialState = {
  map: {
    center: TERSUS_POSITION,
    marker: {
      position: TERSUS_POSITION,
      address: TERSUS_ADDRESS,
    },
  },
};
const store = configureStore(initialState);

ReactDOM.render(
  // eslint-disable-next-line
  <Provider store={store}><Routes /></Provider>,
  document.getElementById('map'),
);
