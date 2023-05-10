import Purchase from "./Purchase";

const PurchaseConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: "purchases/:purchaseId",
            element: <Purchase />,
        },
    ],
};

export default PurchaseConfig;

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
