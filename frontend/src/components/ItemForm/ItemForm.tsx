import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import { Category, ItemMutation } from '../../types.ts';

interface Props {
  onSubmit: (item: ItemMutation) => void;
  categories: Category[];
}

const ItemForm: React.FC<Props> = ({ onSubmit, categories }) => {
  const [item, setItem] = useState<ItemMutation>({
    user: "",
    category: "",
    title: "",
    description: "",
    imageUrl: null,
    price: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItem((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        label="Пользователь"
        name="user"
        value={item.user}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        select
        label="Категория"
        name="category"
        value={item.category}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        {categories.map((cat) => (
          <MenuItem key={cat._id} value={cat._id}>
            {cat.title}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Заголовок"
        name="title"
        value={item.title}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Описание"
        name="description"
        value={item.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        multiline
      />
      <TextField
        label="Цена"
        name="price"
        type="number"
        value={item.price}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Создать пост
      </Button>
    </form>
  );
};

export default ItemForm;
