import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks.ts";
import ExistsUser from './ExistsUser/ExistsUser.tsx';
import UnknownUser from './UnknownUser/UnknownUser.tsx';


const Toolbar = () => {
  const user = useAppSelector((state) => state.users.user)
  return (
    <>
      <div className='navbar position-sticky' style={{backgroundColor: 'black'}}>
        <NavLink to='/'>
          LaLafo
        </NavLink>

        {user ? (
          <>
            <ExistsUser user={user}/>
          </>
        ) : (
          <>
            <UnknownUser />
          </>
        )}

      </div>
    </>
  );
};

export default Toolbar;