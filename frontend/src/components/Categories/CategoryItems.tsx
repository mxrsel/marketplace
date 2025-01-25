import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useParams } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner.tsx';
import ItemsItem from '../Items/ItemsItem.tsx';
import { getItemsByCategory } from '../../store/thunk/categoriesThunk.ts';

const CategoryItems = () => {
  const {categoryId} = useParams()
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.items);
  const loading = useAppSelector((state) => state.items.itemsLoading);

  const categoryItems = items.filter(item => item.category._id === categoryId);

  useEffect(() => {
    if(!categoryId) {
      console.error('Category not found')
      return
    }
    if(!items.length) {
      dispatch(getItemsByCategory(categoryId))
    }
  }, [dispatch, categoryId, items]);

  if(!categoryItems.length) {
    return <p>No items</p>
  }
  return (
    <div>
      {loading ? <Spinner/>
        : (
          <>
            {items.map((item) => (
              <ItemsItem key={item._id} items={item} />
            ))}
          </>
        )
      }
    </div>
  );
};

export default CategoryItems;