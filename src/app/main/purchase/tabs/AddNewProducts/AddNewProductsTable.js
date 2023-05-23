import FuseScrollbars from "@fuse/core/FuseScrollbars";
import _ from "@lodash";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import withRouter from "@fuse/core/withRouter";
import {
    getProducts,
    selectProducts,
    selectProductsSearchText,
    selectProduct,
} from "../../../store/productsSlice";
import FuseLoading from "@fuse/core/FuseLoading";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

import AddNewProductsTableHead from "./AddNewProductsTableHead";

function AddNewProductsTable(props) {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const searchText = useSelector(selectProductsSearchText);

    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(products);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts()).then(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, products]);

    useEffect(() => {
        if (searchText.length !== 0 && products) {
            setData(
                _.filter(
                    products,
                    (item) =>
                        item.product_title
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                        (item.sku_list &&
                            item.sku_list.some((sku) =>
                                sku
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase()),
                            )) ||
                        (item.ean_list &&
                            item.ean_list.some((ean) =>
                                ean
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase()),
                            )),
                ),
            );
            setPage(0);
        } else {
            setData(products);
        }
    }, [products, searchText]);

    function handleDeselect() {
        setSelected([]);
    }

    function handleClick(item) {
        dispatch(selectProduct(item.product_id));
    }

    function handleChangePage(event, value) {
        setPage(value);
    }

    function handleChangeRowsPerPage(event) {
        console.log(event);
        setRowsPerPage(event.target.value);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <FuseLoading />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" variant="h5">
                    There are no products!
                </Typography>
            </motion.div>
        );
    }

    return (
        <div className="w-full flex flex-col min-h-full">
            <FuseScrollbars className="grow overflow-x-auto">
                <Table
                    stickyHeader
                    className="min-w-xl"
                    aria-labelledby="tableTitle"
                >
                    <AddNewProductsTableHead
                        selectedProductIds={selected}
                        rowCount={data.length}
                        onMenuItemClick={handleDeselect}
                    />

                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage,
                            )
                            .map((n) => {
                                const isSelected =
                                    selected.indexOf(n.product_id) !== -1;
                                return (
                                    <TableRow
                                        className="h-72 cursor-pointer"
                                        hover
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.product_id}
                                        selected={isSelected}
                                        onClick={(event) => handleClick(n)}
                                    >
                                        <TableCell
                                            className="w-52 px-4 md:px-0"
                                            component="th"
                                            scope="row"
                                            padding="none"
                                        >
                                            <img
                                                className="w-full block rounded"
                                                src={`assets/images/products/${n.product_id}.jpg`}
                                                alt={n.name}
                                            />
                                            {n.name}
                                        </TableCell>

                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.product_title}
                                        </TableCell>

                                        <TableCell
                                            className="p-4 md:p-16 truncate"
                                            component="th"
                                            scope="row"
                                        >
                                            {n.ean_list.join(", ")}
                                        </TableCell>

                                        <TableCell
                                            className="p-4 md:p-16"
                                            component="th"
                                            scope="row"
                                            align="right"
                                        >
                                            <span>$</span>
                                            {n.product_id}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </FuseScrollbars>

            <TablePagination
                className="shrink-0 border-t-1"
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                    "aria-label": "Next Page",
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default withRouter(AddNewProductsTable);
