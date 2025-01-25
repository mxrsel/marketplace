import Toolbar from './components/UI/Toolbar/Toolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './containers/users/RegisterPage.tsx';
import LoginPage from './containers/users/LoginPage.tsx';
import Items from './components/Items/Items.tsx';

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
          <Route path='/' element={<Items/>}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;