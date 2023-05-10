import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
    getPurchase,
    newPurchase,
    resetPurchase,
    selectPurchase,
} from "../store/purchaseSlice";
import reducer from "../store";
import PurchaseHeader from "./PurchaseHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import ProductsTab from "./tabs/ProductsTab";
/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    invoice_nr: yup
        .string()
        .required("You must enter a invoice_nr")
        .min(5, "The invoice_nr name must be at least 5 characters"),
});

function Purchase(props) {
    const dispatch = useDispatch();
    const purchase = useSelector(selectPurchase);
    const isMobile = useThemeMediaQuery((theme) =>
        theme.breakpoints.down("lg"),
    );

    const routeParams = useParams("");
    const [tabValue, setTabValue] = useState(0);
    const [noPurchase, setNoPurchase] = useState(false);
    const methods = useForm({
        mode: "onChange",
        defaultValues: {},
        resolver: yupResolver(schema),
    });
    const { reset, watch, control, onChange, formState } = methods;
    const form = watch();

    useDeepCompareEffect(() => {
        function updatePurchaseState() {
            const { purchaseId } = routeParams;

            if (purchaseId === "new") {
                /**
                 * Create New Purchase data
                 */
                dispatch(newPurchase());
            } else {
                /**
                 * Get Purchase data
                 */
                dispatch(getPurchase(purchaseId)).then((action) => {
                    /**
                     * If the requested purchase is not exist show message
                     */
                    if (!action.payload) {
                        setNoPurchase(true);
                    }
                });
            }
        }

        updatePurchaseState();
    }, [dispatch, routeParams]);

    useEffect(() => {
        console.log("Purchase");
        console.log(purchase);
        console.log(routeParams);
        console.log("*****************************");
        if (!purchase) {
            return;
        }
        /**
         * Reset the form on purchase state changes
         */
        reset(purchase);
    }, [purchase, reset]);

    useEffect(() => {
        return () => {
            /**
             * Reset Purchase on component unload
             */
            dispatch(resetPurchase());
            setNoPurchase(false);
        };
    }, [dispatch]);

    /**
     * Tab Change
     */
    function handleTabChange(event, value) {
        setTabValue(value);
    }

    /**
     * Show Message if the requested purchases is not exists
     */
    if (noPurchase) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There is no such purchase!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/purchases"
                    color="inherit"
                >
                    Go to Purchases Page
                </Button>
            </motion.div>
        );
    }

    /**
     * Wait while purchase data is loading and form is setted
     */

    if (
        _.isEmpty(form) ||
        (purchase &&
            routeParams.purchaseId !== purchase.purchase_id &&
            routeParams.purchaseId !== "new")
    ) {
        return <FuseLoading />;
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<PurchaseHeader />}
                content={
                    <>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="scrollable"
                            scrollButtons="auto"
                            classes={{ root: "w-full h-64 border-b-1" }}
                        >
                            <Tab className="h-64" label="Basic Info" />
                            <Tab className="h-64" label="Products" />
                        </Tabs>
                        <div className="p-16 sm:p-24 max-w-3xl">
                            <div className={tabValue !== 0 ? "hidden" : ""}>
                                <BasicInfoTab />
                            </div>
                            <div className={tabValue !== 1 ? "hidden" : ""}>
                                <ProductsTab />
                            </div>
                        </div>
                    </>
                }
                scroll={isMobile ? "normal" : "content"}
            />
        </FormProvider>
    );
}

export default withReducer("eCommerceApp", reducer)(Purchase);
