import {
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { useEffect, useRef, useState } from "react";
import { NameItem } from "./NameItem";
import {addToCart, sendRate, averageRate } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../store/productSlice";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useAuth } from "../hooks/use-auth";

const GoodCard = () => {
  const product = useSelector((state) => state.product.products);
  const order = useSelector((state) => state.cart.cart);
  const {isAuth} = useAuth();
  const swiperRef = useRef(null);
  const thumbsSwiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct({ id }));
  }, [id, dispatch]);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleThumbClick = (index) => {
    setActiveSlide(index);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <Container sx={{ mt: "4.5rem" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            loop
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          >
            <div className="swiper-button-prev" onClick={handlePrev}></div>
            {product.poster &&
              product.poster.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={product.name}
                    style={{
                      height: "100%",
                      objectFit: "contain",
                      width: "100%",
                    }}
                  />
                </SwiperSlide>
              ))}
            <div className="swiper-button-next" onClick={handleNext}></div>
          </Swiper>

          <Swiper
            ref={thumbsSwiperRef}
            spaceBetween={10}
            slidesPerView={6}
            watchSlidesProgress
            className="thumbs-swiper"
          >
            {product.poster &&
              product.poster.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={product.name}
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      objectFit: "contain",
                      width: "100%",
                      border: index === activeSlide ? "2px solid #000" : "none",
                    }}
                    onClick={() => handleThumbClick(index)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h4" component="h4" sx={{ padding: "10px" }}>
            {product.name}
          </Typography>

          <Box
            sx={{
              width: "auto",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0 0.75rem",
            }}
          >
            <Rating
              name="simple-controlled"
              size="medium"
              precision={0.2}
              max={10}
              value={averageRate(product.rate)}
              onChange={(e) => isAuth ? sendRate(dispatch, id, product.rate, parseFloat(e.target.value)) : null}
              readOnly={!isAuth}
            />
            <Typography variant="inherit" component="span">
              {averageRate(product.rate)}
            </Typography>
          </Box>

          <Typography variant="body" component="p" sx={{ padding: "10px" }}>
            {product.description}
          </Typography>

          <NameItem name="Автор" />
          <Chip label={product.author} />
          <NameItem name="Мова" />
          <Chip label={product.language} />
          <NameItem name="Рік" />
          <Chip label={product.year} />
          <NameItem name="Кількість сторінок" />
          <Chip label={product.pages} />
          <Divider sx={{ mt: "1rem" }} />
          <Typography
            variant="h5"
            component="h5"
            sx={{ padding: "0 10px", textAlign: "right", mt: "1rem" }}
          >
            {product.price} ₴
          </Typography>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                color: product.inStock ? "green" : "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "0.25rem",
              }}
            >
              <DriveEtaIcon />{product.inStock?'В наявності':'Немає в наявності'}
            </Typography>
            <Button
              color={product.inStock ? "primary" : "inherit"}
              aria-label="add to shopping cart"
              sx={{ mt: "0.75rem", width: "100%", maxHeight: "3.5rem" }}
              variant={product.inStock ? "outlined" : "contained"}
              size="large"
              startIcon={product.inStock ? <AddShoppingCartIcon /> : null}
              onClick={() => product.inStock ?
                addToCart(
                  dispatch,
                  order,
                  id,
                  product.name,
                  product.price,
                  product.poster
                )
                : console.log("нет в наличии")
              }
            >
              {product.inStock ? "Купити" : "Повідомити про наявність" }
            </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default GoodCard;
