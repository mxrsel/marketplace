import React from 'react';
import { Item } from '../../types.ts';
import { Card, CardContent, CardMedia } from '@mui/material';
import { apiURL } from '../../globalConstants.ts';
import Typography from '@mui/material/Typography';

interface Props {
  items: Item
}

const ItemsItem: React.FC<Props> = ({items}) => {
  return (
    <>
    <Card
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
      </CardContent>
    </Card>
    </>
  );
};

export default ItemsItem;