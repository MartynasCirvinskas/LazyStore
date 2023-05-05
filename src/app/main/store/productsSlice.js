import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('eCommerceApp/products/getProducts', async () => {
  const response = await axios.get('http://127.0.0.1:5000/');
  const data = await response.data;
  console.log('getProducts data:', data);
  return data;
});

export const removeProducts = createAsyncThunk(
  'eCommerceApp/products',
  async (productIds, { dispatch, getState }) => {
    await axios.delete('/api/ecommerce/products', { data: productIds });

    return productIds;
  }
);

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.product_id
});

export const { selectAll: selectProducts, selectById: selectProductById } =
  productsAdapter.getSelectors((state) => state.eCommerceApp.products);



const productsSlice = createSlice({
  name: 'eCommerceApp/products',
  initialState: productsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setProductsSearchText: {
      reducer: (state, action) => {
        console.log('setProductsSearchText payload:', action.payload);
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: productsAdapter.setAll,
    [removeProducts.fulfilled]: (state, action) =>
      productsAdapter.removeMany(state, action.payload),
  },
});

export const { setProductsSearchText } = productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) => eCommerceApp.products.searchText;

export default productsSlice.reducer;
