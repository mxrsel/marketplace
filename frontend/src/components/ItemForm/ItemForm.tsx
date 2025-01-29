import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ItemMutation } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getAllCategories } from '../../store/thunk/categoriesThunk.ts';
import FileInput from '../UI/FileInput.tsx';
import { CloudUpload } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

interface Props {
  onSubmit: (item: ItemMutation) => void;
}

const ItemForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories)
  const [item, setItem] = useState<ItemMutation>({
    user: "",
    category: "",
    title: "",
    description: "",
    imageUrl: null,
    price: "",
  });


  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setItem((prev) => ({
        ...prev,
        imageUrl: e.target.files![0],
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="user"
        name="user"
        value={item.user}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      {categories.length === 0 ? null : (
        <Grid size={{ xs: 12 }}>
          <FormControl fullWidth>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              id="category_id"
              value={item.category}
              name="category"
              required
              label="Category"
              onChange={selectChangeHandler}
            >
              <MenuItem value="" disabled>
                Select category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      <TextField
        label="Title"
        name="title"
        value={item.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={item.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        multiline
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={item.price}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FileInput
        fullWidth
        label="Image"
        name="image"
        buttonText="Choose file"
        buttonProps={{ startIcon: <CloudUpload /> }}
        onChange={handleFileChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create item
      </Button>
    </form>
  );
};

export default ItemForm;
