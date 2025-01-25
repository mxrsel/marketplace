import React from 'react';
import { Category } from '../../types.ts';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';

interface Props {
  categories: Category;
}

const CategoriesItem: React.FC<Props> = ({categories}) => {
  return (
    <>
      <NavLink to={`/items/${categories._id}`}>
      <Card>
        <Typography>{categories.title}</Typography>
      </Card>
      </NavLink>
    </>
  );
};

export default CategoriesItem;