import { addRate } from '../store/productSlice';
import { setOrder, openCart } from '../store/cartSlice';
import { openSnackbar, setMessage } from '../store/snackbarSlice';

// Rating

export const sendRate = (dispatch, id, currentRate, newRate) => {
    const addNewRate = {
        id,
        rate: [...currentRate, newRate]
    }
    dispatch(addRate(addNewRate))
} 


export const averageRate = (rate) => { 
    if (rate && rate.length > 0) {
        return parseFloat((rate.reduce((sum, currentValue) => sum + currentValue, 0)/rate.length).toFixed(2))
    }
    return 0;
}

// Order

export const addToCart = (dispatch, order, id, name, price, poster) => {

    let quantity = 1;

    const indexInOrder = order.findIndex((item) => item.id === id);

    if (indexInOrder > -1) {     
        dispatch(openCart())
    } else {
        dispatch(setOrder(
            {
                id,
                name,
                price,
                quantity, 
                poster
            },
                    
        ));
        dispatch(openSnackbar())
        dispatch(setMessage('Товар додано у кошик'))
    }
};