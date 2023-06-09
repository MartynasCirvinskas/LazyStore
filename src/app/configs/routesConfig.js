import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import Error404Page from "../main/404/Error404Page";

import ProductsConfig from "../main/products/ProductsConfig";
import ProductConfig from "../main/product/ProductConfig";
import PurchasesConfig from "../main/purchases/PurchasesConfig";
import PurchaseConfig from "../main/purchase/PurchaseConfig";

const routeConfigs = [
    ProductsConfig,
    ProductConfig,
    PurchasesConfig,
    PurchaseConfig,
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(
        routeConfigs,
        settingsConfig.defaultAuth,
    ),
    {
        path: "/",
        element: <Navigate to="/example" />,
        auth: settingsConfig.defaultAuth,
    },
    {
        path: "loading",
        element: <FuseLoading />,
    },
    {
        path: "404",
        element: <Error404Page />,
    },
    {
        path: "*",
        element: <Navigate to="404" />,
    },
];

export default routes;
