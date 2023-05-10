import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import FuseUtils from "@fuse/utils";
import { selectPurchases } from "./purchasesSlice"; // Make sure to use the correct path to your purchasesSlice

export const getPurchase = createAsyncThunk(
    "eCommerceApp/purchase/getPurchase",
    async (purchaseId, { getState }) => {
        // Get the purchases from the state
        const purchases = selectPurchases(getState());

        // Find the purchase in the purchases list
        const purchase = purchases.find((p) => p.purchase_id === purchaseId);

        // If purchase is found, return it, otherwise make an API call

        if (purchase) {
            return purchase;
        } else {
            const response = await axios.get(
                `http://127.0.0.1:5000/purchases/${purchaseId}`,
            );
            const data = await response.data;
            return data === undefined ? null : data;
        }
    },
);

export const removePurchase = createAsyncThunk(
    "eCommerceApp/purchase/removePurchase",
    async (val, { dispatch, getState }) => {
        const { id } = getState().eCommerceApp.purchase;
        await axios.delete(`/purchases/${id}`);
        return id;
    },
);

export const savePurchase = createAsyncThunk(
    "eCommerceApp/purchase/savePurchase",
    async (purchaseData, { dispatch, getState }) => {
        const { id } = getState().eCommerceApp;

        const response = await axios.put(
            `/api/ecommerce/purchases/${id}`,
            purchaseData,
        );

        const data = await response.data;

        return data;
    },
);

const purchaseSlice = createSlice({
    name: "eCommerceApp/purchase",
    initialState: null,
    reducers: {
        resetPurchase: () => null,
        newPurchase: {
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
    },
    extraReducers: {
        [getPurchase.fulfilled]: (state, action) => action.payload,
        [savePurchase.fulfilled]: (state, action) => action.payload,
        [removePurchase.fulfilled]: (state, action) => null,
    },
});

export const { newPurchase, resetPurchase } = purchaseSlice.actions;

export const selectPurchase = ({ eCommerceApp }) => eCommerceApp.purchase;

export default purchaseSlice.reducer;
