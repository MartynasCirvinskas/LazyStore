import Products from './Products';

const ProductsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'products',
      element: <Products />,
    },
  ],
};

export default ProductsConfig;

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
