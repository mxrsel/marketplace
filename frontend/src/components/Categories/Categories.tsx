import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { fetchCategories } from '../../store/thunk/categoriesThunk.ts';
import CategoriesItem from './CategoriesItem.tsx';
import Spinner from '../UI/Spinner/Spinner.tsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.categoriesLoading);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <>
      <Button component={NavLink} to='/'>All Items</Button>
      {loading ? <Spinner/> : (
        <>
          {categories.map((category) => (
            <>
            <CategoriesItem key={category._id} categories={category} />
            </>
          ))}
        </>
      )}
    </>
  );
};

export default Categories;