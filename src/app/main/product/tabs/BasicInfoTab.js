import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import CommentSection from "../../comment/CommentSection";
import { useState } from "react";

function BasicInfoTab(props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { product_id } = formState.defaultValues;
    const { errors } = formState;

    // State for storing the image file
    const [imageFile, setImageFile] = useState(
        `assets/images/products/${product_id}.jpg`,
    );

    // Getting product id from default values

    const handleImageUpload = (event) => {
        setImageFile(URL.createObjectURL(event.target.files[0]));
    };

    return (
        <div>
            <div className="image-upload-container">
                {imageFile ? (
                    <img src={imageFile} alt="Product" />
                ) : (
                    <input type="file" onChange={handleImageUpload} />
                )}
            </div>
            <Controller
                name="product_title"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="mt-8 mb-16"
                        error={!!errors.name}
                        required
                        helperText={errors?.name?.message}
                        label="Name"
                        autoFocus
                        id="product_title"
                        variant="outlined"
                        fullWidth
                    />
                )}
            />

            <Controller
                name="sku_list"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder=""
                                label="SKU's"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                )}
            />
            <Controller
                name="ean_list"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                    <Autocomplete
                        className="mt-8 mb-16"
                        multiple
                        freeSolo
                        options={[]}
                        value={value}
                        onChange={(event, newValue) => {
                            onChange(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder=""
                                label="EAN's"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        )}
                    />
                )}
            />
            <CommentSection product={formState.defaultValues} />
        </div>
    );
}

export default BasicInfoTab;
