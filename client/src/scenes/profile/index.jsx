import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  TextField,
} from "@mui/material";

import { Edit } from "@mui/icons-material";
import profileImage from "../../assets/profile.jpeg";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../../components/Modal";
import FlexBetween from "../../components/FlexBetween";
import { updateUser } from "../../state";
import { useAlertContext } from "../../providers/alert/AlertProvider";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);
  const { name, role, email, phone } = user;
  const [profileMeta, setProfileMeta] = useState({});
  const [openAlertBar] = useAlertContext();
  const [profileOpen, setProfileOpen] = useState(false);
  const handleProfileModalOpen = () => setProfileOpen(true);
  const handleProfileModalClose = () => setProfileOpen(false);

  const checkIfValid = (formData) => {
    const isFormValid = Object.values(formData).every((value) => value !== "");

    if (isFormValid) {
      return true;
    }
    return false;
  };

  const handleEdit = () => {
    setProfileMeta({ email, phone });
    handleProfileModalOpen();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!checkIfValid(profileMeta)) {
      openAlertBar({
        type: "error",
        msg: "Error, fields are required",
      });
      return;
    }
    openAlertBar({
      type: "success",
      msg: "Profile updated",
    });
    dispatch(updateUser(profileMeta));
    handleProfileModalClose();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileMeta((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} md={4}>
        <Avatar
          sx={{ width: "200px", height: "200px" }}
          src={profileImage}
          alt="profile"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Edit />}
          sx={{ marginTop: "20px" }}
          onClick={handleEdit}
        >
          Edit Profile
        </Button>
      </Grid>
      <Grid item xs={12} md={8}>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="h3">{name}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {role}
          </Typography>
          <Divider />
        </Box>
        <Box>
          <Typography variant="h4">Contact Information</Typography>
          <List>
            <ListItem>
              <ListItemText primary="Email:" secondary={email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Phone:" secondary={phone} />
            </ListItem>
          </List>
        </Box>
      </Grid>
      <ModalWrapper open={profileOpen} handleClose={handleProfileModalClose}>
        <Box>
          <Typography variant="h3" mb="30px">
            Update Profile
          </Typography>
          <form
            onSubmit={handleUpdate}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              size="small"
              onChange={handleChange}
              value={profileMeta.email}
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              size="small"
              onChange={handleChange}
              value={profileMeta.phone}
            />

            <FlexBetween>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleProfileModalClose}
              >
                Close
              </Button>
              <Button
                onClick={handleUpdate}
                type="submit"
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </FlexBetween>
          </form>
        </Box>
      </ModalWrapper>
    </Grid>
  );
};

export default Profile;
