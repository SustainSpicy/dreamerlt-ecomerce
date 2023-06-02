import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import ModalWrapper from "../../components/Modal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state/cart";

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const cards = useSelector((state) => state.global.products);
  const user = useSelector((state) => state.global.user);

  const handleModalOpen = (selectedItem) => {
    setModalData(selectedItem);
    setOpen(true);
  };
  const handleModalClose = () => setOpen(false);

  return (
    <Box width="100%" height="100%">
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: theme.palette.background.alt,
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color={theme.palette.primary[600]}
            gutterBottom
          >
            Products
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color={theme.palette.secondary[300]}
            paragraph
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorum
            excepturi architecto ipsum iusto eligendi id asperiores accusantium
            accusamus tempo
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards?.map((card) => {
            const { name, price } = card;
            return (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="product"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexGrow: 1,
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {name}
                    </Typography>
                    <Typography>${price}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary.light,
                      }}
                      onClick={() => handleModalOpen(card)}
                    >
                      View
                    </Button>
                    {user && (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: theme.palette.secondary.light,
                          color: theme.palette.background.alt,
                          boxShadow: "none",
                        }}
                        onClick={(e) => dispatch(addToCart(card))}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      <ModalWrapper open={open} handleClose={handleModalClose}>
        {modalData && (
          <>
            <Typography
              sx={{ my: 2 }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              {modalData.name}
            </Typography>

            <CardMedia
              component="img"
              image="https://source.unsplash.com/random"
              alt="product"
            />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalData.description}
            </Typography>
          </>
        )}
      </ModalWrapper>
    </Box>
  );
};

export default Home;
