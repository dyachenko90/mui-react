import { ShoppingBasket } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import { openCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
// import LogInModal from "./Modal";
// import { useState } from "react";
import { AuthProvider } from "./Auth";


const Header = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.cart.cart);


  const handleOpenCart = () => {
    dispatch(openCart());
  };


  const orderLength = order.reduce(
    (acc, currentValue) => acc + currentValue.quantity,
    0
  );

  return (
    <AppBar sx={{ opacity: 0.8 }} position="fixed">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Link to="/">
          <Typography variant="h6" component="span" sx={{cursor: 'pointer'}}>
            ***BOOK | STORE***
          </Typography>
        </Link>
        <Box sx={{display: 'flex'}}>
          <AuthProvider />
          <IconButton color="inherit" onClick={handleOpenCart}>
            <Badge color="secondary" badgeContent={orderLength}>
              <ShoppingBasket />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
      {/* <LogInModal open={open} setOpen={setOpen} /> */}
    </AppBar>
  );
};

export default Header;
