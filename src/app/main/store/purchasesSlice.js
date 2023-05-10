import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getPurchases = createAsyncThunk(
    "eCommerceApp/purchases/getPurchases",
    async () => {
        const response = await axios.get("http://127.0.0.1:5000/purchases");
        const data = await response.data;

        return data;
    },
);

export const removePurchases = createAsyncThunk(
    "eCommerceApp/purchases",
    async (purchaseIds, { dispatch, getState }) => {
        await axios.delete("/api/ecommerce/purchases", { data: purchaseIds });

        return purchaseIds;
    },
);

const purchasesAdapter = createEntityAdapter({
    selectId: (purchase) => purchase.purchase_id,
});

export const { selectAll: selectPurchases, selectById: selectPurchaseById } =
    purchasesAdapter.getSelectors((state) => state.eCommerceApp.purchases);

const purchasesSlice = createSlice({
    name: "eCommerceApp/purchases",
    initialState: purchasesAdapter.getInitialState({
        searchText: "",
    }),
    reducers: {
        setPurchasesSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: (event) => ({ payload: event.target.value || "" }),
        },
    },
    extraReducers: {
        [getPurchases.fulfilled]: purchasesAdapter.setAll,
        [removePurchases.fulfilled]: (state, action) =>
            purchasesAdapter.removeMany(state, action.payload),
    },
});

export const { setPurchasesSearchText } = purchasesSlice.actions;

export const selectPurchasesSearchText = ({ eCommerceApp }) => {
    return eCommerceApp.purchases.searchText;
};

export default purchasesSlice.reducer;
