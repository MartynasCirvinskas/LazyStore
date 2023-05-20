import TextField from "@mui/material/TextField";
import { orange } from "@mui/material/colors";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { lighten, styled } from "@mui/material/styles";
import FuseUtils from "@fuse/utils";
import CommentSection from "../../comment/CommentSection";
import { useState } from "react";
import Box from "@mui/material/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import SvgIcon from "@mui/material/SvgIcon";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
        // Save the File object to the state
        setImageFile(event.target.files[0]);
    };

    const [imageExists, setImageExists] = useState(true);

    return (
        <div>
            <Controller
                name="productImage"
                control={control}
                defaultValue={`assets/images/products/${product_id}.jpg`}
                render={({ field: { onChange, value } }) => {
                    // Check if image exists
                    const img = new Image();
                    img.src = value;
                    img.onload = () => setImageExists(true);
                    img.onerror = () => setImageExists(false);

                    return (
                        <Box
                            sx={{
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "light"
                                        ? lighten(
                                              theme.palette.background.default,
                                              0.4,
                                          )
                                        : lighten(
                                              theme.palette.background.default,
                                              0.02,
                                          ),
                            }}
                            component="label"
                            htmlFor="button-file"
                            className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                        >
                            <input
                                accept="image/*"
                                className="hidden"
                                id="button-file"
                                type="file"
                                onChange={(event) => {
                                    handleImageUpload(event);
                                    onChange(
                                        URL.createObjectURL(
                                            event.target.files[0],
                                        ),
                                    );
                                }}
                            />
                            {imageExists ? (
                                <img
                                    className="max-w-none w-auto h-full"
                                    src={value}
                                    alt="Product"
                                />
                            ) : (
                                <FuseSvgIcon size={32} color="action">
                                    heroicons-outline:upload
                                </FuseSvgIcon>
                            )}
                        </Box>
                    );
                }}
            />
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
