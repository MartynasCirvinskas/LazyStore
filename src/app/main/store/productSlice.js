import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';
import { selectProducts } from './productsSlice'; // Make sure to use the correct path to your productsSlice

export const getProduct = createAsyncThunk(
  'eCommerceApp/product/getProduct',
  async (productId, { getState }) => {
    // Get the products from the state
    const products = selectProducts(getState());

    // Find the product in the products list
    const product = products.find((p) => p.product_id === productId);

    // If product is found, return it, otherwise make an API call
    if (product) {
      return product;
    } 
    else {
      const response = await axios.get(`/api/ecommerce/products/${productId}`);
      const data = await response.data;
      return data === undefined ? null : data;
    }
  }
);


export const removeProduct = createAsyncThunk(
  'eCommerceApp/product/removeProduct',
  async (val, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp.product;
    await axios.delete(`/api/ecommerce/products/${id}`);
    return id;
  }
);

export const saveProduct = createAsyncThunk(
  'eCommerceApp/product/saveProduct',
  async (productData, { dispatch, getState }) => {
    const { id } = getState().eCommerceApp;

    const response = await axios.put(`/api/ecommerce/products/${id}`, productData);

    const data = await response.data;

    return data;
  }
);

const productSlice = createSlice({
  name: 'eCommerceApp/product',
  initialState: null,
  reducers: {
    resetProduct: () => null,
    newProduct: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          name: '',
          handle: '',
          description: '',
          categories: [],
          tags: [],
          images: [],
          priceTaxExcl: 0,
          priceTaxIncl: 0,
          taxRate: 0,
          comparedPrice: 0,
          quantity: 0,
          sku: '',
          width: '',
          height: '',
          depth: '',
          weight: '',
          extraShippingFee: 0,
          active: true,
        },
      }),
    },
  },
  extraReducers: {
    [getProduct.fulfilled]: (state, action) => action.payload,
    [saveProduct.fulfilled]: (state, action) => action.payload,
    [removeProduct.fulfilled]: (state, action) => null,
  },
});

export const { newProduct, resetProduct } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
