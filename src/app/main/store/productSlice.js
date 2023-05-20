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
        console.log("saveProduct", productData);

        // Create a FormData object and append all fields of productData to it
        const formData = new FormData();
        Object.keys(productData).forEach((key) => {
            formData.append(key, productData[key]);
        });

        const response = await axios.post(
            `http://127.0.0.1:5000/product/${id}`,
            formData,

            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        );

        const data = await response.data;

        return data;
    },
);

export const addCommentToProduct = createAsyncThunk(
    "eCommerceApp/product/addComment",
    async ({ productId, comment }, { dispatch, getState }) => {
        console.log("addCommentToProduct");

        // Fetch the current state
        const state = getState().eCommerceApp.product;
        let currentComments = [];

        // If the current product has comments, copy them to the currentComments array
        if (state && state.product_id === productId && state.comments) {
            currentComments = [...state.comments];
        }

        // Add the new comment to the currentComments array
        currentComments.push(comment);

        console.log("Current comments:", currentComments);

        // Make an API call to add the comment to the product on the server
        const response = await axios.post(
            `http://127.0.0.1:5000/product_comment/${productId}`,
            {
                comments: currentComments, // Send the entire updated comments array
            },
        );

        // The server should ideally return the updated product data
        const data = await response.data;

        // For now, we'll also add the comment in the local state
        return { productId, comment };
    },
);

export const removeCommentFromProduct = createAsyncThunk(
    "eCommerceApp/product/removeComment",
    async ({ productId, index }, { dispatch, getState }) => {
        // Get the product from the state
        const product = selectProduct(getState());

        // Ensure there are comments and the product is the correct one
        if (!product || product.product_id !== productId || !product.comments) {
            throw new Error("Invalid product or no comments to remove");
        }

        // Remove the comment at the given index
        const updatedComments = product.comments.filter(
            (_, commentIndex) => commentIndex !== index,
        );

        // Make an API call to update the comments on the product on the server
        const response = await axios.post(
            `http://127.0.0.1:5000/product_comment/${productId}`,
            {
                comments: updatedComments, // Send the entire updated comments array
            },
        );

        // The server should ideally return the updated product data
        const data = await response.data;

        // For now, we'll just update the comments in the local state
        return { productId, updatedComments };
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
                    quantity: 0,
                    sku_list: [],
                    ean_list: [],
                    comments: [],
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
            if (state && state.product_id === action.payload.productId) {
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
            if (state && state.product_id === action.payload.productId) {
                state.comments.splice(action.payload.index, 1);
            }
        },
    },
});

export const { newProduct, resetProduct, addComment, removeComment } =
    productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
