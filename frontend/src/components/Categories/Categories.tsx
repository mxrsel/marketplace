import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import { getAllCategories } from '../../store/thunk/categoriesThunk.ts';
import CategoriesItem from './CategoriesItem.tsx';
import Spinner from '../UI/Spinner/Spinner.tsx';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.categoriesLoading);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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