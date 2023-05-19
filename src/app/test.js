// ...your other imports and actions

export const removeCommentFromProduct = createAsyncThunk(
    "eCommerceApp/product/removeComment",
    async ({ productId, index }, { dispatch, getState }) => {
        // You could make an API call here to remove the comment from the product on the server
        // For now, we'll just remove the comment in the local state

        return { productId, index };
    },
);

const productSlice = createSlice({
    // ...your other reducers and actions
    reducers: {
        // ...your other reducers
        removeComment: (state, action) => {
            if (state && state.id === action.payload.productId) {
                state.comments.splice(action.payload.index, 1);
            }
        },
    },
    extraReducers: {
        // ...your other extraReducers
        [removeCommentFromProduct.fulfilled]: (state, action) => {
            if (state && state.id === action.payload.productId) {
                state.comments.splice(action.payload.index, 1);
            }
        },
    },
});

export const { newProduct, resetProduct, addComment, removeComment } =
    productSlice.actions;

// ...the rest of your Redux slice
