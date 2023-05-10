import Orders from "./Orders";

const OrdersConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "orders",
      element: <Orders />,
    },
  ],
};

export default OrdersConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
