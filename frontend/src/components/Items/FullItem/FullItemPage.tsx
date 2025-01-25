
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useEffect } from 'react';
import { getItemById } from '../../../store/thunk/itemsThunk.ts';
import Container from '@mui/material/Container';
import Spinner from '../../UI/Spinner/Spinner.tsx';
import FullItem from './FullItem.tsx';

const FullItemPage = () => {
  const { itemId } = useParams();
  const dispatch = useAppDispatch();
  const fullItem = useAppSelector((state) => state.items.oneItem);
  const loading = useAppSelector((state) => state.items.itemsLoading);

  useEffect(() => {
    if (!itemId) {
      console.error('Post not found!');
      return;
    }
    dispatch(getItemById(itemId));
  }, [dispatch, itemId]);

  if (!fullItem) return null;

  return (
    <>
      <Container maxWidth="md">
        {loading ? (
          <Spinner />
        ) : (
          <>

            <FullItem key={fullItem._id} itemData={fullItem} />
          </>
        )}
      </Container>
    </>
  );
};

export default FullItemPage;