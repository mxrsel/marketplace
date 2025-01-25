import React from 'react';
import { Item } from '../../types.ts';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import { apiURL } from '../../globalConstants.ts';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteItem } from '../../store/thunk/itemsThunk.ts';

interface Props {
  items: Item
}

const ItemsItem: React.FC<Props> = ({items}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.user);

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete item?')) {
      await dispatch(deleteItem(items._id));
    }
  };
  return (
    <>
    <Card component={NavLink} to='/fullItem'
    sx={{
      maxWidth: 350,
      borderRadius: 4
    }}>
      <CardMedia
      component="img"
      height='200'
      image={`${apiURL}/${items.imageUrl}`}
      alt={items.title}
      />
      <CardContent>
        <Typography variant='h3'>
          {items.title}
        </Typography>
        <Typography variant='body1'>
          {items.price}
        </Typography>
        {user && (
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
            Delete
            </Button>
            )}
      </CardContent>
    </Card>
    </>
  );
};

export default ItemsItem;