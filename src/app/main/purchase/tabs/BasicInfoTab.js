import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;

    return (
        <div>
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
                            value ? moment(value).format("YYYY-MM-DD") : null
                        }
                        onChange={(e) => onChange(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                )}
            />
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
        </div>
    );
}

export default BasicInfoTab;
