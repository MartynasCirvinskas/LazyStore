import { combineReducers } from "@reduxjs/toolkit";
import order from "./orderSlice";
import orders from "./ordersSlice";
import product from "./productSlice";
import products from "./productsSlice";
import purchases from "./purchasesSlice";
import purchase from "./purchaseSlice";

const reducer = combineReducers({
    purchase,
    products,
    product,
    orders,
    order,
    purchases,
});

export default reducer;
