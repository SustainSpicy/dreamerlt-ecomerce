//utils
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import profileImage from "../../assets/profile.jpeg";
import FlexBetween from "../../components/FlexBetween";

import { setUser, setUserId } from "../../state";
import { useAlertContext } from "../../providers/alert/AlertProvider";

const usersList = [
  {
    _id: "1",
    name: "Buyer 1",
    role: "user",
    email: "something@mail.com",
    phone: "9999-9999-99",
  },
  {
    _id: "2",
    name: "Seller 1",
    role: "owner",
    email: "something@mail.com",
    phone: "9999-9999-99",
  },
];
const Signin = () => {
  const [openAlertBar] = useAlertContext();
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignin = async (e, user) => {
    e.preventDefault();
    dispatch(setUser(user));
    openAlertBar({
      type: "success",
      msg: "Login successful!",
    });
    if (user.role === "user") navigate("/");
    if (user.role === "owner") navigate("/owner/dashboard");
  };

  return (
    <FlexBetween
      marginTop="3rem"
      flexDirection="column"
      justifyContent="center"
      gap="2rem"
    >
      <Typography variant="h3">Login</Typography>
      <Stack direction="row" gap={12}>
        {usersList &&
          usersList.map((item, index) => {
            const { name, role } = item;
            return (
              <Button
                key={index}
                onClick={(e) => handleSignin(e, item)}
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
                    {name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                    {role}
                  </Typography>
                </Box>
              </Button>
            );
          })}
      </Stack>
    </FlexBetween>
  );
};

export default Signin;
