import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function BasicInfoTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="supplier"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="Supplier"
                            autoFocus
                            id="supplier"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="invoice_nr"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="Invoice Number"
                            autoFocus
                            id="invoice_nr"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="order_nr"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="Order Number"
                            autoFocus
                            id="order_nr"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                {" "}
                <Controller
                    name="date"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.date}
                            required
                            helperText={errors?.date?.message}
                            label="Date"
                            id="date"
                            variant="outlined"
                            type="date"
                            value={
                                value
                                    ? moment(value).format("YYYY-MM-DD")
                                    : null
                            }
                            onChange={(e) => onChange(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="total_price"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="Total Price"
                            autoFocus
                            id="total_price"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="shipping_price"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="Shipping Price"
                            autoFocus
                            id="shipping_price"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Controller
                    name="vat"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            className="mt-8 mb-16 mr-8"
                            error={!!errors.name}
                            required
                            helperText={errors?.name?.message}
                            label="VAT"
                            autoFocus
                            id="vat"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
}

export default BasicInfoTab;
