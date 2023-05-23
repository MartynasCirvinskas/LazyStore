import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import TextField from "@mui/material/TextField";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../../../store";
import { useForm } from "react-hook-form";
import moment from "moment";
import AddNewProductsHeader from "./AddNewProductsHeader";
import AddNewProductsTable from "./AddNewProductsTable";
import {
    selectSelectedProduct,
    resetSelectedProductId,
} from "../../../store/productsSlice";
import { addProductToPurchase } from "../../../store/purchaseSlice"; // Make sure to use the correct path to your purchaseSlice

import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

function AddNewProducts() {
    const isMobile = useThemeMediaQuery((theme) =>
        theme.breakpoints.down("lg"),
    );
    const [productId, setProductId] = useState("");
    const selectedProductId = useSelector(selectSelectedProduct);
    const { control, handleSubmit, formState, reset } = useForm();
    const { errors } = formState;
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProductId) {
            setProductId(selectedProductId);
        }
    }, [selectedProductId]);

    // Handle the button click event
    const handleButtonClick = handleSubmit((data) => {
        const product = {
            product_id: productId,
            ordered_amount: data.orderedAmount,
            price: data.price,
        };

        dispatch(addProductToPurchase(product));

        // Reset the form fields
        reset({
            productId: "",
            orderedAmount: "",
            price: "",
        });
        // Reset selectedProductId
        dispatch(resetSelectedProductId());
        setProductId("");
    });
    return (
        <div>
            <h1>{selectedProductId}</h1>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="productId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={selectedProductId || field.value}
                                label="Product Id"
                                error={Boolean(errors.productId)}
                                helperText={errors.productId?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="price"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Price"
                                error={Boolean(errors.price)}
                                helperText={errors.price?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Controller
                        name="orderedAmount"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Ordered Amount"
                                error={Boolean(errors.orderedAmount)}
                                helperText={errors.orderedAmount?.message}
                                fullWidth
                            />
                        )}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleButtonClick}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
            <FusePageCarded
                header={<AddNewProductsHeader />}
                content={<AddNewProductsTable />}
                scroll={isMobile ? "normal" : "content"}
            />
        </div>
    );
}

export default withReducer("eCommerceApp", reducer)(AddNewProducts);
