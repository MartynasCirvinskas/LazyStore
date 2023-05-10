import FusePageCarded from "@fuse/core/FusePageCarded";
import withReducer from "app/store/withReducer";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import reducer from "../store";
import PurchasesHeader from "./PurchasesHeader";
import PurchasesTable from "./PurchasesTable";

function Purchases() {
    const isMobile = useThemeMediaQuery((theme) =>
        theme.breakpoints.down("lg"),
    );

    return (
        <FusePageCarded
            header={<PurchasesHeader />}
            content={<PurchasesTable />}
            scroll={isMobile ? "normal" : "content"}
        />
    );
}

export default withReducer("eCommerceApp", reducer)(Purchases);
