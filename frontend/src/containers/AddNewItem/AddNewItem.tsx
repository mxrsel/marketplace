import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { ItemMutation } from '../../types.ts';
import { createNewItem } from '../../store/thunk/itemsThunk.ts';
import ItemForm from '../../components/ItemForm/ItemForm.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import { useNavigate } from 'react-router-dom';


const NewItem = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.items.itemsLoading)
  const navigate = useNavigate();


  const handleSubmit = async(item: ItemMutation) => {
    await dispatch(createNewItem(item)).unwrap();
    navigate('/')

  };

  return (
    <div>
      <h2>Add New Item</h2>
      {loading ? <Spinner/>
        :
        <ItemForm onSubmit={handleSubmit} />}
    </div>
  );
};

export default NewItem;
