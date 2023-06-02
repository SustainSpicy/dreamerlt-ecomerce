import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";
// import { useGetDashboardQuery } from "state/api";
import StatBox from "../../components/StatBox";

const cards = [
  {
    id: "001",
    name: "Product A",
    description: "This is Product A",
    price: "10.99",
    category: "Category 1",
    seller: "Seller 1",
  },
  {
    id: "002",
    name: "Product B",
    description: "This is Product B",
    price: "5.99",
    category: "Category 1",
    seller: "Seller 2",
  },
  {
    id: "003",
    name: "Product C",
    description: "This is Product C",
    price: "15.99",
    category: "Category 2",
    seller: "Seller 3",
  },
  {
    id: "004",
    name: "Product D",
    description: "This is Product D",
    price: "20.99",
    category: "Category 2",
    seller: "Seller 4",
  },
  {
    id: "005",
    name: "Product E",
    description: "This is Product E",
    price: "8.99",
    category: "Category 1",
    seller: "Seller 5",
  },
  {
    id: "006",
    name: "Product F",
    description: "This is Product F",
    price: "12.99",
    category: "Category 2",
    seller: "Seller 6",
  },
  {
    id: "007",
    name: "Product G",
    description: "This is Product G",
    price: "25.99",
    category: "Category 3",
    seller: "Seller 7",
  },
  {
    id: "008",
    name: "Product H",
    description: "This is Product H",
    price: "19.99",
    category: "Category 3",
    seller: "Seller 8",
  },
  {
    id: "009",
    name: "Product I",
    description: "This is Product I",
    price: "6.99",
    category: "Category 1",
    seller: "Seller 9",
  },
  {
    id: "010",
    name: "Product J",
    description: "This is Product J",
    price: "14.99",
    category: "Category 2",
    seller: "Seller 10",
  },
];
const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  //   const { data, isLoading } = useGetDashboardQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Products"
          value={cards.length}
          increase="+14% increase"
          description="Since last month"
          icon={
            <InventoryIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
