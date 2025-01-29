import { Link } from 'react-router-dom';
import {useAppSelector} from "../../../app/hooks.ts";
import ExistsUser from './ExistsUser/ExistsUser.tsx';
import UnknownUser from './UnknownUser/UnknownUser.tsx';
import Categories from '../../Categories/Categories.tsx';
import { AppBar, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';


const AppToolbar = () => {
  const user = useAppSelector((state) => state.users.user)
  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between',mb: 3}}>
          <Typography variant="h6" component="div">
            <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
              LaLafo
            </Link>
          </Typography>
          <Categories/>
        {user ? (
          <>
            <ExistsUser user={user}/>
          </>
        ) : (
          <>
            <UnknownUser />
          </>
        )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolbar;