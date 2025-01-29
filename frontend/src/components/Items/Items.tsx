import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useEffect } from 'react';
import Spinner from '../UI/Spinner/Spinner.tsx';
import ItemsItem from './ItemsItem.tsx';
import { getAllItems } from '../../store/thunk/itemsThunk.ts';

const Items = () => {
const dispatch = useAppDispatch();
const items = useAppSelector((state) => state.items.items);
const loading = useAppSelector((state) => state.items.itemsLoading);

  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch]);

  return (
    <>
      {loading ? <Spinner/>
      : (
          <>
            {items.map((item) => (
              <ItemsItem key={item._id} items={item}/>
            ))}
          </>
        )}
    </>
  );
};

export default Items;