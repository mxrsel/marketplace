import React from 'react';
import { Item } from '../../types.ts';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { deleteItem } from '../../store/thunk/itemsThunk.ts';
import Box from '@mui/material/Box';

interface Props {
  items: Item
}

export const imageURL = 'http://localhost:8000/public/images'

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
      <Box
        component={NavLink}
        to={`/fullItem/${items._id}`}
        sx={{textDecoration: 'none'
      }}>
    <Card
    sx={{
      maxWidth: 350,
      borderRadius: 4
    }}>
      <CardMedia
        sx={{
          objectFit: 'cover',
        }}
      component="img"
      height='200'
      image={`${imageURL}/${items.imageUrl}`}
      alt={items.title}
      />
      <CardContent>
        <Typography
          variant='h3'
          sx={{
            textAlign: 'center',
          }}>
          {items.title}
        </Typography>
        <Typography
          variant='body1'
        sx={{marginTop: 1}}
        >
          {items.price} KGS
        </Typography>
        {user && (
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2 }}>
            Delete
            </Button>
            )}
      </CardContent>
    </Card>
      </Box>
    </>
  );
};

export default ItemsItem;