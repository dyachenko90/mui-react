import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { ShoppingBasket } from "@mui/icons-material";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { closeCart, clearCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.cart.cart);
  const isOpenCart = useSelector((state) => state.cart.isOpen);

  const handleCloseCart = () => {
    dispatch(closeCart());
  };

  const handleDeleteAndClose = () => {
    dispatch(clearCart())
    dispatch(closeCart());
  }

  return (
    <Drawer
      anchor="right"
      open={isOpenCart}
      onClose={handleCloseCart}
      variant="temporary"
    >
      <List sx={{ minWidth: "600px" }}>
        <ListItem>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText primary="Кошик" />
        </ListItem>
        <Divider />
        {order.length ? <Typography onClick={handleDeleteAndClose} variant='button' sx={{display: 'flex', justifyContent: 'flex-end',padding: '0.75rem', cursor: 'pointer'}}>видалити все</Typography>:null}
        {!order.length ? (
          <ListItem>Кошик порожній</ListItem>
        ) : (
          <>
            {order.map((item) => (
              <React.Fragment key={item.id}>
                <CartItem key={item.name} {...item} />
              <Divider sx={{margin: '0.25rem',borderBottom: '0.1rem solid lightgrey'}}/>
              </React.Fragment>

            ))}
            <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: 700 }}>
                Загальна вартість:{" "}
                {order.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0)}{" "}
                грн.
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                Кількість товарів в замовленні:{" "}
                {order.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0)}{" "}
              </Typography>
            </ListItem>

            <Link to={`/order`}>
              <Button
                color="primary"
                aria-label="add to shopping cart"
                sx={{ mt: "1rem", width: "95%", maxHeight: "3.5rem", ml: '1rem'}}
                variant="outlined"
                size="large"
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={() =>
                    handleCloseCart()
                }
              >
                Оформити замовлення
              </Button>
            </Link>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default Cart;
