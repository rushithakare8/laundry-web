import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from '../layouts/CoreLayout';
// eslint-disable-next-line
import HomeView from '../views/HomeView';
import NewOrderView from '../views/NewOrderView';
import ProfileView from '../views/ProfileView';

export default () => (
  <Route path="/main" component={CoreLayout} >
    <IndexRoute component={HomeView} />
    <Route path="/main/neworder" component={NewOrderView} />
    <Route path="/main/profile" component={ProfileView} />
  </Route>
);
