import Toolbar from './components/UI/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './containers/users/RegisterPage.tsx';
import LoginPage from './containers/users/LoginPage.tsx';
import Items from './components/Items/Items.tsx';
import CategoryItems from './components/Categories/CategoryItems.tsx';
import NewItem from './containers/AddNewItem/AddNewItem.tsx';
import FullItemPage from './components/Items/FullItem/FullItemPage.tsx';

const App = () => {
  return (
    <div>
      <header>
        <Toolbar />
      </header>

      <main>
        <Routes>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/items/category/:categoryId' element={<CategoryItems/>}/>
          <Route path='/' element={<Items/>}/>
          <Route path='/addNewItem' element={<NewItem/>}/>
          <Route path='/fullItem/:itemId' element={<FullItemPage/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;