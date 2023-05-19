import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { selectProducts } from "./productsSlice"; // Make sure to use the correct path to your productsSlice

export const getProduct = createAsyncThunk(
    "eCommerceApp/product/getProduct",
    async (productId, { getState }) => {
        // Get the products from the state
        const products = selectProducts(getState());

        // Find the product in the products list
        const product = products.find((p) => p.product_id === productId);

        // If product is found, return it, otherwise make an API call
        if (product) {
            return product;
        }
        const response = await axios.get(
            `http://127.0.0.1:5000/product/${productId}`,
        );
        const data = await response.data;
        return data === undefined ? null : data;
    },
);

export const removeProduct = createAsyncThunk(
    "eCommerceApp/product/removeProduct",
    async (val, { dispatch, getState }) => {
        const { id } = getState().eCommerceApp.product;
        await axios.delete(`/api/ecommerce/products/${id}`);
        return id;
    },
);

export const saveProduct = createAsyncThunk(
    "eCommerceApp/product/saveProduct",
    async (productData, { dispatch, getState }) => {
        const { id } = getState().eCommerceApp;

        const response = await axios.put(
            `/api/ecommerce/products/${id}`,
            productData,
        );

        const data = await response.data;

        return data;
    },
);

export const addCommentToProduct = createAsyncThunk(
    "eCommerceApp/product/addComment",
    async ({ productId, comment }, { dispatch, getState }) => {
        console.log("store");
        console.log(productId, comment);
        // You could make an API call here to add the comment to the product on the server
        // For now, we'll just add the comment in the local state

        return { productId, comment };
    },
);
export const removeCommentFromProduct = createAsyncThunk(
    "eCommerceApp/product/removeComment",
    async ({ productId, index }, { dispatch, getState }) => {
        // You could make an API call here to remove the comment from the product on the server
        // For now, we'll just remove the comment in the local state

        return { productId, index };
    },
);

const productSlice = createSlice({
    name: "eCommerceApp/product",
    initialState: null,
    reducers: {
        resetProduct: () => null,
        newProduct: {
            reducer: (state, action) => action.payload,
            prepare: (event) => ({
                payload: {
                    id: FuseUtils.generateGUID(),
                    name: "",
                    handle: "",
                    description: "",
                    categories: [],
                    tags: [],
                    images: [],
                    priceTaxExcl: 0,
                    priceTaxIncl: 0,
                    taxRate: 0,
                    comparedPrice: 0,
                    quantity: 0,
                    sku: "",
                    width: "",
                    height: "",
                    depth: "",
                    weight: "",
                    extraShippingFee: 0,
                    active: true,
                },
            }),
        },
        addComment: (state, action) => {
            if (state && state.product_id === action.payload.productId) {
                if (!state.comments) {
                    state.comments = [];
                }
                state.comments.push(action.payload.comment);
            }
        },
        removeComment: (state, action) => {
            if (state && state.id === action.payload.productId) {
                state.comments.splice(action.payload.index, 1);
            }
        },
    },
    extraReducers: {
        [getProduct.fulfilled]: (state, action) => action.payload,
        [saveProduct.fulfilled]: (state, action) => action.payload,
        [removeProduct.fulfilled]: (state, action) => null,
        [addCommentToProduct.fulfilled]: (state, action) => {
            if (state && state.product_id === action.payload.productId) {
                if (!state.comments) {
                    state.comments = [];
                }
                state.comments.push(action.payload.comment);
            }
        },
        [removeCommentFromProduct.fulfilled]: (state, action) => {
            if (state && state.id === action.payload.productId) {
                state.comments.splice(action.payload.index, 1);
            }
        },
    },
});

export const { newProduct, resetProduct, addComment, removeComment } =
    productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
