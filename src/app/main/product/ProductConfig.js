import Product from './Product';

const ProductConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'products/:productId',
      element: <Product />,
    },
  ],
};

export default ProductConfig;

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
