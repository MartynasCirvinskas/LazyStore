import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
    "eCommerceApp/products/getProducts",
    async () => {
        const response = await axios.get("http://127.0.0.1:5000/");
        const data = await response.data;

        return data;
    },
);

export const removeProducts = createAsyncThunk(
    "eCommerceApp/products",
    async (productIds, { dispatch, getState }) => {
        await axios.delete("/api/ecommerce/products", { data: productIds });

        return productIds;
    },
);

const productsAdapter = createEntityAdapter({
    selectId: (product) => product.product_id,
});

export const { selectAll: selectProducts, selectById: selectProductById } =
    productsAdapter.getSelectors((state) => state.eCommerceApp.products);

const productsSlice = createSlice({
    name: "eCommerceApp/products",
    initialState: productsAdapter.getInitialState({
        searchText: "",
        selectedProductId: "", // Add this line
    }),
    reducers: {
        setProductsSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || "" }),
        },
        selectProduct: (state, action) => {
            // Add this reducer
            state.selectedProductId = action.payload;
        },
        resetSelectedProductId: (state) => {
            state.selectedProductId = null;
        },
    },
    extraReducers: {
        [getProducts.fulfilled]: productsAdapter.setAll,
        [removeProducts.fulfilled]: (state, action) =>
            productsAdapter.removeMany(state, action.payload),
    },
});

export const selectProductsByIds = (state, productIds) =>
    productIds.map((id) => selectProductById(state, id));

export const { setProductsSearchText, selectProduct, resetSelectedProductId } =
    productsSlice.actions;

export const selectProductsSearchText = ({ eCommerceApp }) => {
    return eCommerceApp.products.searchText;
};

export const selectSelectedProduct = (state) =>
    state.eCommerceApp.products.selectedProductId; // Add this selector

export default productsSlice.reducer;
