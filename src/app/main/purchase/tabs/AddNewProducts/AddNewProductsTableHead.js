import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/system";
import TableHead from "@mui/material/TableHead";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten } from "@mui/material/styles";
import { removeProducts } from "../../../store/productsSlice";

const rows = [
    {
        id: "image",
        align: "left",
        disablePadding: true,
        label: "",
    },
    {
        id: "name",
        align: "left",
        disablePadding: false,
        label: "Name",
    },
    {
        id: "categories",
        align: "left",
        disablePadding: false,
        label: "Category",
    },
    {
        id: "priceTaxIncl",
        align: "right",
        disablePadding: false,
        label: "Price",
    },
    {
        id: "quantity",
        align: "right",
        disablePadding: false,
        label: "Quantity",
    },
    {
        id: "active",
        align: "right",
        disablePadding: false,
        label: "Active",
    },
];

function AddNewProductsTableHead(props) {
    const { selectedProductIds } = props;
    const numSelected = selectedProductIds.length;

    const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

    const dispatch = useDispatch();

    const createSortHandler = (property) => (event) => {
        props.onRequestSort(event, property);
    };

    function openSelectedProductsMenu(event) {
        setSelectedProductsMenu(event.currentTarget);
    }

    function closeSelectedProductsMenu() {
        setSelectedProductsMenu(null);
    }

    return (
        <TableHead>
            <TableRow className="h-48 sm:h-64">
                {rows.map((row) => {
                    console.log(row);
                    return (
                        <TableCell
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
                            className="p-4 md:p-16"
                            key={row.id}
                            align={row.align}
                            label={row.label}
                            padding={row.disablePadding ? "none" : "normal"}
                        >
                            {row.label}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

export default AddNewProductsTableHead;
