import React from 'react';
import { Item } from '../../../types.ts';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardMedia, Divider } from '@mui/material';
import { imageURL } from '../ItemsItem.tsx';

interface Props {
  itemData: Item
}

const FullItem: React.FC<Props> = ({itemData}) => {
  return (
    <Grid container direction='column'>
        <Grid container spacing={4} alignItems="center">
            <CardMedia
              component="img"
              image={`${imageURL}/${itemData.imageUrl}`}
              alt={itemData.title}
              sx={{
                borderRadius: 2,
                width: "100%",
                height: 300,
                objectFit: "cover",
              }}
            />
          </Grid>

            <Box>
              <Typography variant="h4" fontWeight="bold">
                {itemData.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography color="text.secondary">
                Seller: {itemData.user.username}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {itemData.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                {itemData.price} KGS
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Category: {itemData.category.title}
              </Typography>
            </Box>
    </Grid>
  );
};

export default FullItem;