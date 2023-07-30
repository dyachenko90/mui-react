import { ListItem, Typography, Button, TextField } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector} from "react-redux";
import { removeFromOrder, changeQuantity } from "../store/cartSlice";


const CartItem = ({id, name, price, quantity, poster}) => {
    
    const dispatch = useDispatch();
    const order = useSelector(state => state.cart.cart);


    const increment = (id) => {
        let currentItem = order.find(item => item.id === id)
        let editQuantity = {
            ...currentItem,
            quantity: currentItem.quantity + 1
        }
        dispatch(changeQuantity(editQuantity))

    }

    const decrement = (id) => {
        let currentItem = order.find(item => item.id === id)
        let editQuantity = {
            ...currentItem,
            quantity: currentItem.quantity - 1 > 1 ? currentItem.quantity - 1 : 1
        }
        dispatch(changeQuantity(editQuantity))
    }

    const changeValue = (id, value) => {
        dispatch(changeQuantity({ id, quantity: value }));
    }

    return (
        <ListItem sx={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
                    <img 
                        src={poster[0]} 
                        alt={name}
                        style={{ height:"100px", objectFit: 'contain', width: '70px', borderRadius: '15%'}}
                    />
                    <Typography sx={{maxWidth: '250px'}} variant="body1" component="h3">
                        {name}  
                    </Typography>
                    <Typography sx={{fontWeight: 700}}>{price} грн.</Typography>
                    <Button onClick={()=> decrement(id)}>-</Button>
                    <TextField type='text' sx={{maxWidth: '3.5rem'}} variant='outlined' value={quantity} onChange={(e) => changeValue(id, parseInt(e.target.value))}/>
                    <Button onClick={() => increment(id)}>+</Button>
                    <Button
                        className='btn btn-primary'
                        onClick={() => dispatch(removeFromOrder(id))}
                    >
                        <DeleteOutlineOutlinedIcon/>
                    </Button>
        </ListItem>
    );
};

export default CartItem;