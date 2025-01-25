import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllItems } from '../../store/thunk/itemsThunk'; // Получение всех элементов
import ItemsItem from '../Items/ItemsItem';
import Spinner from '../UI/Spinner/Spinner';

const AllItems = () => {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector((state) => state.items.items);
  const loading = useAppSelector((state) => state.items.itemsLoading);

  useEffect(() => {
    if (!allItems.length) {
      dispatch(getAllItems());
    }
  }, [dispatch, allItems.length]);

  if (loading) {
    return <Spinner />;
  }

  if (!allItems.length) {
    return <div>No items available.</div>;
  }

  return (
    <div>
      {allItems.map((item) => (
        <ItemsItem key={item._id} items={item} />
      ))}
    </div>
  );
};

export default AllItems;
