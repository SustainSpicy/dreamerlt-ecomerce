import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  IconButton,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import ModalWrapper from "../../components/Modal";

import { addProduct, deleteProduct, updateProduct } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import { useAlertContext } from "../../providers/alert/AlertProvider";

const Products = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [productMeta, setProductMeta] = useState({});
  const [openAlertBar] = useAlertContext();
  const user = useSelector((state) => state.global.user);
  const productList = useSelector((state) => state.global.products).filter(
    (item) => item.seller === user.name
  );
  const [productOpen, setProductOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductModalOpen = () => setProductOpen(true);
  const handleProductModalClose = () => setProductOpen(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      // flex: 0.1,
    },
    {
      field: "name",
      headerName: "Name",
      // flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      // flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      // flex: 0.5,
      sortable: false,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
    {
      field: "category",
      headerName: "Category",
      // flex: 0.5,
    },
    {
      field: "operation",
      headerName: "Operation",
      // flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={() => handleEdit(params.row)}>
              <Edit />
            </IconButton>

            <IconButton onClick={() => handleDelete(params.row)}>
              <Delete color="error" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const handleDelete = (product) => {
    dispatch(deleteProduct(product.id));
    openAlertBar({
      type: "error",
      msg: "Product deleted!",
    });
  };
  const handleEdit = (product) => {
    setProductMeta(product);
    setIsEdit(true);
    handleProductModalOpen();
  };

  const handleCreate = () => {
    setProductMeta({
      name: "",
      description: "",
      price: "",
      category: "",
    });
    setIsEdit(false);
    handleProductModalOpen();
  };

  const checkIfValid = (formData) => {
    const isFormValid = Object.values(formData).every((value) => value !== "");

    if (isFormValid) {
      return true;
    }
    return false;
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!checkIfValid(productMeta)) {
      openAlertBar({
        type: "error",
        msg: "Error, fields are required",
      });
      return;
    }
    openAlertBar({
      type: "success",
      msg: "Product created",
    });
    dispatch(addProduct(productMeta));

    handleProductModalClose();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!checkIfValid(productMeta)) {
      openAlertBar({
        type: "error",
        msg: "Error, fields are required",
      });
      return;
    }
    openAlertBar({
      type: "success",
      msg: "Update successfull",
    });
    dispatch(updateProduct(productMeta));
    setIsEdit(false);
    handleProductModalClose();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductMeta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="PRODUCTS" subtitle="See your list of products." />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleCreate}
          >
            <AddIcon sx={{ mr: "10px" }} />
            Add new product
          </Button>
        </Box>
      </FlexBetween>

      <Box
        gridColumn="span 8"
        gridRow="span 3"
        sx={{
          mt: 2,
          "& .MuiDataGrid-root": {
            border: "none",
            minHeight: "150px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row.id}
          rows={productList || []}
          columns={columns}
        />
      </Box>

      <ModalWrapper open={productOpen} handleClose={handleProductModalClose}>
        <Box>
          <Typography variant="h3" mb="30px">
            {isEdit ? "Edit Product" : "Add New Product"}
          </Typography>
          <form
            onSubmit={isEdit ? handleUpdate : handleSave}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Product Name"
              size="small"
              onChange={handleChange}
              value={productMeta.name}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              size="small"
              onChange={handleChange}
              value={productMeta.description}
            />
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              size="small"
              onChange={handleChange}
              value={productMeta.price}
            />
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                size="small"
                onChange={handleChange}
                value={productMeta.category}
              >
                <MenuItem value="Category 1">Category 1</MenuItem>
                <MenuItem value="Category 2">Category 2</MenuItem>
                <MenuItem value="Category 3">Category 3</MenuItem>
              </Select>
            </FormControl>
            <FlexBetween>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleProductModalClose}
              >
                Close
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEdit ? "Update Product" : "Add Product"}
              </Button>
            </FlexBetween>
          </form>
        </Box>
      </ModalWrapper>
    </Box>
  );
};

export default Products;
