import React, {useState} from 'react';
import {Button, Menu, MenuItem} from "@mui/material";
import { User } from '../../../../types.ts';
import { useAppDispatch } from '../../../../app/hooks.ts';
import { logout } from '../../../../store/thunk/usersThunk.ts';
import { logoutUser } from '../../../../store/slice/usersSlice.ts';
import { NavLink } from 'react-router-dom';


interface Props {
  user: User
}

const ExistsUser: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const onClose = () => {
    setAnchorEl(null);
  }

  const userLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
  }

  return (
    <>
      <div>
        <Button component={NavLink} to={'/addNewItem'}>
          Add New Item
        </Button>
        <Button
          onClick={onClick}
          style={{color: 'white'}}>
          {user.username}
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={onClose}>
          <MenuItem>
            Profile
          </MenuItem>
          <MenuItem>
            Settings
          </MenuItem>
          <MenuItem
            onClick={userLogout}>
            Log out
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default ExistsUser;