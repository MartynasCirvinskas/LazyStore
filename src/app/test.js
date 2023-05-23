import { useState, useEffect } from "react";

function AddNewProducts() {
    // ...

    const selectedProductId = useSelector(selectSelectedProduct);
    const [productId, setProductId] = useState("");

    useEffect(() => {
        if (selectedProductId) {
            setProductId(selectedProductId);
        }
    }, [selectedProductId]);

    // ...

    const handleButtonClick = handleSubmit((data) => {
        const product = {
            product_id: productId, // Use productId instead of data.productId
            ordered_amount: data.orderedAmount,
            price: data.price,
        };

        // ...

        // Reset the local state
        setProductId("");

        // ...
    });

    // ...

    <Controller
        name="productId"
        control={control}
        defaultValue=""
        render={({ field }) => (
            <TextField
                {...field}
                value={productId || field.value} // Use productId instead of selectedProductId
                // ...
            />
        )}
    />;
    // ...
}
