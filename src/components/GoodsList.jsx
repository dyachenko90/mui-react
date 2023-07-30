import { Grid, Typography, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import GoodsItem from './GoodsItem';
import { getProducts } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Search  from './Search';

const GoodsList = () => {
  const [loading, setLoading] = useState(true); 

  const goods = useSelector(state => state.product.products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
      .then(() => setLoading(false)); 
  }, [dispatch])

  return (
    <>
      <Search />
      <Grid container rowSpacing={5} columnSpacing={2}>
        {loading ? (
          Array.from({ length: goods.length }).map((_, index) => (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <Skeleton variant="rectangular" height={350} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))
        ) : (
          goods.length ? (
            goods.map((item) => (
              <GoodsItem key={item.id} {...item} />
            ))
          ) : (
            <Typography
              variant="body2"
              component="p"
              sx={{ mt: '1.5rem', ml: '1rem' }}
            >
              Нічого не знайдено
            </Typography>
          )
        )}
      </Grid>
    </>
  );
};

export default GoodsList;