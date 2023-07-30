import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts, searchForProducts } from '../store/productSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    if (!e.target.value) {
      dispatch(getProducts());
      setSearch('');
    }
    setSearch(e.target.value.trim());
    dispatch(searchForProducts(e.target.value.trim()));
  };

  return (
    <TextField
      color="primary"
      label="Я шукаю"
      type="search"
      value={search}
      onChange={handleChange}
      variant="standard"
      fullWidth
      sx={{ mt: '3.5rem', mb: '1.5rem' }}
    />
  );
};

export default Search;
