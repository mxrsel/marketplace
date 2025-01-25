import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getAllCategories } from '../../store/thunk/categoriesThunk.ts';
import { ItemMutation } from '../../types.ts';
import { createNewItem } from '../../store/thunk/itemsThunk.ts';
import ItemForm from '../../components/ItemForm/ItemForm.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';


const NewItem = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categoryItems)
  const loading = useAppSelector((state) => state.categories.categoriesLoading)

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleSubmit = (item: ItemMutation) => {
    dispatch(createNewItem(item));
  };

  return (
    <div>
      <h2>Создание нового поста</h2>
      {loading ? <Spinner/>
        :
        <ItemForm onSubmit={handleSubmit} categories={categories} />}
    </div>
  );
};

export default NewItem;
