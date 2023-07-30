import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
    'products/getProducts', async (_, { rejectWithValue }) => {
        const res = await axios.get(`https://62f4be75535c0c50e7615631.mockapi.io/goods`);
        return res.data;
    }
);
export const getProduct = createAsyncThunk(
    'products/getProduct', async ({id}, { rejectWithValue }) => {
        const res = await axios.get(`https://62f4be75535c0c50e7615631.mockapi.io/goods/${id}`);
        return res.data;
    }
);

export const searchForProducts = createAsyncThunk(
    'products/searchForProducts', async (value, { rejectWithValue }) => {
        const res = await axios.get(`https://62f4be75535c0c50e7615631.mockapi.io/goods?name=${value}`);
        return res.data;
    }
);

export const addRate = createAsyncThunk(
    'products/addRate', async ({id, rate}, { rejectWithValue }) => {
        try {
            const res = await axios.put(`https://62f4be75535c0c50e7615631.mockapi.io/goods/${id}`, {id, rate});
            return res.data;

        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        notification: null,
    },
    reducers: {},
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.products = action.payload;
        },
        [searchForProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        },
          
        [addRate.fulfilled]: (state, action) => {
            const { id, rate } = action.payload;
            // Проверяем тип state.products
            if (Array.isArray(state.products)) {
                // Если state.products - массив, обновляем rate для соответствующего товара
                const updatedProducts = state.products.map((product) => {
                    if (product.id === id) {
                        return { ...product, rate: [...rate] };
                    }
                    return product;
                });
                state.products = updatedProducts;
            } else {
                // Если state.products - объект, обновляем rate для товара
                state.products = { ...state.products, rate: [...rate] };
            }
          
            state.notification = {
                type: 'success',
                message: 'Rating added successfully!',
            };
        },
        
}});

export default productSlice.reducer;










