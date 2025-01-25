import React from 'react';
import { Item } from '../../../types.ts';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardMedia, Divider } from '@mui/material';
import { apiURL } from '../../../globalConstants.ts';

interface Props {
  itemData: Item
}

const FullItem: React.FC<Props> = ({itemData}) => {
  return (
    <Grid container direction='column'>
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ marginBottom: 1 }}>
        </Typography>
      </Box>
      <Divider sx={{ mb: 1, mt: 1 }} />
      <Typography variant='h4' style={{marginBottom: 4}} textAlign="center">
        {itemData.title}
      </Typography>
      <CardMedia
        component="img"
        height='200'
        image={`${apiURL}/${itemData.imageUrl}`}
        alt={itemData.title}
      />
      <Box>
        <Typography>
          {itemData.user.username}
        </Typography>
        <Typography variant='body1' style={{marginTop: 3}}>
          {itemData.description}
        </Typography>
        <Typography>
          {itemData.price}
        </Typography>
        <Typography>
          {itemData.category.title}
        </Typography>
      </Box>
    </Grid>
  );
};

export default FullItem;