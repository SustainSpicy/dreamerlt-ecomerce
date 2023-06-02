import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Add,
  Remove,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import FlexBetween from "./FlexBetween";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setUser, setUserId } from "../state";
import profileImage from "../assets/profile.jpeg";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useTheme,
  MenuItem,
  Menu,
  Button,
  Badge,
  Drawer,
  Stack,
  Divider,
} from "@mui/material";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../state/cart";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "../providers/alert/AlertProvider";
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [openAlertBar] = useAlertContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [state, setState] = useState(false);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(setUser(null));
    openAlertBar({
      type: "info",
      msg: "Signout successful",
    });
  };

  if (user) {
    return (
      <AppBar
        sx={{
          position: "static",
          background: "none",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            justifyContent:
              user.role === "owner" ? "space-between" : "flex-end",
          }}
        >
          {/* LEFT */}
          {user.role === "owner" && (
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <MenuIcon />
              </IconButton>

              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}

          {/* RIGHT */}
          <FlexBetween gap="1.5rem">
            {user.role === "owner" && (
              <>
                <IconButton onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === "dark" ? (
                    <DarkModeOutlined sx={{ fontSize: "25px" }} />
                  ) : (
                    <LightModeOutlined sx={{ fontSize: "25px" }} />
                  )}
                </IconButton>
              </>
            )}
            {user.role === "user" && (
              <>
                <IconButton
                  aria-label="cart"
                  onClick={toggleDrawer("right", true)}
                >
                  <Badge
                    badgeContent={cartItems.length}
                    color="secondary"
                    sx={{
                      fontSize: "25px",
                      "& .MuiBadge-badge": {
                        right: -3,
                        top: 13,
                        border: `2px solid ${theme.palette.background.paper}`,
                        padding: "0 4px",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <FlexBetween>
                  <Button
                    onClick={handleClick}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textTransform: "none",
                      gap: "1rem",
                    }}
                  >
                    <Box
                      component="img"
                      alt="profile"
                      src={profileImage}
                      height="32px"
                      width="32px"
                      borderRadius="50%"
                      sx={{ objectFit: "cover" }}
                    />
                    <Box textAlign="left">
                      <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{ color: theme.palette.secondary[100] }}
                      >
                        {user?.name}
                      </Typography>
                      <Typography
                        fontSize="0.75rem"
                        sx={{ color: theme.palette.secondary[200] }}
                      >
                        {user?.role}
                      </Typography>
                    </Box>
                    <ArrowDropDownOutlined
                      sx={{
                        color: theme.palette.secondary[300],
                        fontSize: "25px",
                      }}
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  >
                    <MenuItem onClick={handleSignout}>Log Out</MenuItem>
                  </Menu>
                </FlexBetween>
              </>
            )}
          </FlexBetween>
        </Toolbar>
        <Drawer
          anchor={"right"}
          open={state}
          onClose={toggleDrawer("right", false)}
        >
          <Box
            gap="2rem"
            p="2rem"
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "25rem",
            }}
          >
            <Typography varient="h2">Cart Items</Typography>
            {cartItems.length
              ? cartItems.map((item, index) => {
                  const { name, price, quantity } = item;
                  return (
                    <Stack
                      spacing={2}
                      key={index}
                      p="10px 5px"
                      divider={<Divider orientation="horizontal" flexItem />}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Typography varient="h5"> {name}</Typography>
                        <Typography varient="h5"> ${price}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          sx={{
                            backgroundColor:
                              quantity > 1
                                ? theme.palette.secondary.light
                                : theme.palette.neutral.main,
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <span>{quantity}</span>
                        <IconButton
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          sx={{
                            backgroundColor: theme.palette.secondary.light,
                          }}
                        >
                          <Add />
                        </IconButton>
                        <IconButton
                          onClick={() => dispatch(removeItem(item.id))}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Stack>
                    </Stack>
                  );
                })
              : "Cart is empty"}
          </Box>
        </Drawer>
      </AppBar>
    );
  }

  return (
    <AppBar
      sx={{
        position: "static",
        background: theme.palette.background.paper,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        {/* <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          p="0.1rem 1.5rem"
        >
          <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween> */}
        <Button
          variant="outlined"
          onClick={() => navigate("/login")}
          sx={{
            justifySelf: "flex-end",
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.secondary.light,
          }}
        >
          Signin
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
