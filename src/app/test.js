import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { selectProducts } from "./productsSlice"; // Make sure to use the correct path to your productsSlice

// ...

export const addCommentToProduct = createAsyncThunk(
    "eCommerceApp/product/addComment",
    async ({ productId, comment }, { dispatch, getState }) => {
        // You could make an API call here to add the comment to the product on the server
        // For now, we'll just add the comment in the local state

        return { productId, comment };
    },
);

// ...

const productSlice = createSlice({
    name: "eCommerceApp/product",
    initialState: null,
    reducers: {
        // ...
        addComment: (state, action) => {
            if (state && state.id === action.payload.productId) {
                if (!state.comments) {
                    state.comments = [];
                }
                state.comments.push(action.payload.comment);
            }
        },
    },
    extraReducers: {
        // ...
        [addCommentToProduct.fulfilled]: (state, action) => {
            if (state && state.id === action.payload.productId) {
                if (!state.comments) {
                    state.comments = [];
                }
                state.comments.push(action.payload.comment);
            }
        },
    },
});

export const { newProduct, resetProduct, addComment } = productSlice.actions;

export const selectProduct = ({ eCommerceApp }) => eCommerceApp.product;

export default productSlice.reducer;
