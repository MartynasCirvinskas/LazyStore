import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    selectProductsByIds,
    getProducts,
    selectProducts,
} from "../../../store/productsSlice";

function ProductsTab(props) {
    const dispatch = useDispatch();
    const methods = useFormContext();
    const products = useSelector(selectProducts);
    const { control, formState } = methods;
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const { errors } = formState;

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts()).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, products]);

    const combinedProducts = formState.defaultValues.products.map((product) => {
        const detailedProduct = products.find(
            (products) => products.product_id === product.product_id,
        );
        return { ...product, ...detailedProduct };
    });

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Title</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {combinedProducts.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{product.product_id}</TableCell>
                            <TableCell>{product.amount}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.product_title}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ProductsTab;
