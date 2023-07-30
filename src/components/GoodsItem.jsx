import {
  Card,
  CardMedia,
  Grid,
  Typography,
  CardContent,
  CardActions,
  Button,
  Rating,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, sendRate, averageRate } from "./utils";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../hooks/use-auth";


const GoodsItem = ({ name, price, poster, id, rate, inStock }) => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart.cart);
  const { isAuth } = useAuth()

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
  };

const handleChangeRate = (e, dispatch, id, rate) => {
  const newValue = parseFloat(e.target.value);
  sendRate(dispatch, id, rate, newValue)
}

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "3px 3px 5px 5px lightgrey",
          padding: "0.75rem",
          "&:hover": {
            cursor: "pointer",
          },
          opacity: inStock ? 1 : 0.4,
        }}
      >
        <Link to={`/products/${id}`}>
          <Slider {...sliderSettings}>
            {poster.map((photo, index) => (
              <div key={index}>
                <CardMedia
                  component="img"
                  image={photo}
                  alt={name}
                  loading="lazy"
                  title={name}
                  sx={{ height: 350, objectFit: "contain", width: "100%" }}
                />
              </div>
            ))}
          </Slider>
        </Link>
        <CardContent>
          <Typography variant="h6" component="h3">
            {name.slice(0, 27) + "..."}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "0.5rem",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                color: inStock ? "green" : "gray",
              }}
            >
              <DriveEtaIcon />
              {inStock ? "В наявності" : "Немає в наявності"}
            </Typography>
            {price} ₴
          </Typography>
        </CardContent>
        <Box
          sx={{
            width: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 0.75rem",
          }}
        >
          <Rating
            name="simple-controlled"
            size="medium"
            precision={0.2}
            max={10}
            value={averageRate(rate)}
            onChange={(e) => isAuth ? handleChangeRate(e, dispatch, id, rate) : null}
            readOnly={!isAuth}
          />
          <Typography variant="inherit" component="span">
            {averageRate(rate)}
          </Typography>
        </Box>

        <CardActions>
          {inStock ? (
            <Button
              color="primary"
              aria-label="add to shopping cart"
              sx={{ width: "100%", maxHeight: "3.5rem" }}
              variant="outlined"
              size="large"
              startIcon={<AddShoppingCartIcon sx={{ mr: 1 }} />}
              onClick={() =>
                addToCart(dispatch, order, id, name, price, poster)
              }
            >
              Купити
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default GoodsItem;
