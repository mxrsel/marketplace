import React from 'react';
import { Category } from '../../types.ts';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';

interface Props {
  categories: Category;
}

const CategoriesItem: React.FC<Props> = ({categories}) => {
  return (
    <>
      <Box
        sx={{textDecoration: 'none'}}
        component={NavLink}
        to={`/items/category/${categories._id}`}>
        <Typography variant='h5' sx={{
          marginRight: 2,
          color: 'white'
        }}>{categories.title}</Typography>
      </Box>
    </>
  );
};

export default CategoriesItem;