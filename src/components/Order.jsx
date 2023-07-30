import { useState, useEffect } from "react";
import {
  ListItem,
  List,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CartItem from './CartItem';
import { useDispatch, useSelector } from "react-redux";
import { TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { useAuth } from '../hooks/use-auth';
import { openSnackbar, setMessage } from "../store/snackbarSlice";

const Order = () => {
  const order = useSelector(state => state.cart.cart);
  const { isAuth, email, displayName } = useAuth()


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [delivery, setDelivery] = useState('');
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [edit, setEdit] = useState(false);

  const [formData, setFormData] = useState({
    firstName: isAuth ? displayName.split(' ')[0] : "",
    lastName: isAuth ? displayName.split(' ')[1] : "",
    email: isAuth ? email : "",
    phone: "",
    deliveryService: "",
    orderGoods: ""
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ім'я обов'язково";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Прізвище обов'язково";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обов'язковий";
      isValid = false;
    } else if (!/^\+?\d+$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
      isValid = false;
    }

    if (!formData.deliveryService) {
      isValid = false;
    }

    setErrors(newErrors);
    setFormValid(isValid);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'deliveryService') {
      setDelivery(value)
      setFormData((prevData) => ({
        ...prevData,
        deliveryService: value,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      console.log("Форма відправлена:", {...formData, orderGoods: order});
      dispatch(openSnackbar())
      dispatch(setMessage('Замовлення успішно відправлено'))
      dispatch(clearCart());
      navigate("/");
    } else {
      console.log("Форма невалідна");
    }
  };


  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (order.length === 0) {
      navigate("/");
    }
  }, [order, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "4.5rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Обрані товари</Typography>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end'}}>
                <Button onClick={() => setEdit(!edit)}>
                  <EditIcon />
                </Button>
            </Box>
            {edit ? (
              order.map(item => 
              <CartItem {...item} key={item.name}/>
            )):(<List
              sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: "1rem",
                background: "#fcfcfc",
                borderRadius: "5px",
              }}
            >
              {order.map((product) => (
                <ListItem
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <img
                    src={product.poster[0]}
                    alt={product.name}
                    style={{
                      height: "100px",
                      objectFit: "contain",
                      width: "70px",
                    }}
                  />
                  <Typography
                    sx={{ maxWidth: "350px" }}
                    variant="button"
                    component="h3"
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="button" sx={{ fontWeight: 500 }}>
                    {`Кількість: ${product.quantity} шт.`}
                  </Typography>
                  <Typography variant="button" sx={{ fontWeight: 500 }}>
                    {`Вартість за одиницю: ${product.price} грн.`}
                  </Typography>
                </ListItem>
              ))}
            </List>)
            }
                <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                <Typography sx={{ fontWeight: 700 }}>
                  Кількість товарів в замовленні:{" "}
                  {order.reduce((acc, item) => {
                    return acc + item.quantity;
                  }, 0)}{" "}
                </Typography>
                  <Typography sx={{ fontWeight: 700 }}>
                  Загальна вартість:{" "}
                  {order.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0)}{" "}
                  грн.
                </Typography>
                </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Контактні дані</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Ім'я"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ mt: "1rem" }}
              fullWidth
              required
            />
            <TextField
              label="Прізвище"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ mt: "1rem" }}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mt: "1rem" }}
              fullWidth
              required
            />
            <TextField
              label="Телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ mt: "1rem" }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Доставка</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Cлужба доставки
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={delivery}
                  name="deliveryService"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="Нова Пошта">Нова Пошта</MenuItem>
                  <MenuItem value="Укрпошта">Укрпошта</MenuItem>
                  <MenuItem value="Meest">Meest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formValid}
            >
              Замовити
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Order;
