import React, {useState} from 'react';
import {RegisterMutation} from "../../types.ts";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Avatar, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {NavLink, useNavigate} from "react-router-dom";
import { selectRegisterError } from '../../store/slice/usersSlice.ts';
import { register } from '../../store/thunk/usersThunk.ts';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const registerError = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [user, setUser] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phoneNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setUser((prevState) => (
      {
        ...prevState,
        [name]: value
      }
    ));
  };

  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(user));
      navigate('/');
    } catch(e) {
      console.log(e)
    }
  };

  const getFieldErr = (fieldName: string) => {
    try {
      return registerError?.errors[fieldName].message;
    } catch {
      return undefined
    }
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container direction={'column'} size={12} spacing={2}>

              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={user.username}
                  onChange={handleChange}
                  error={Boolean(getFieldErr('username'))}
                  helperText={getFieldErr('username')}
                />
              </Grid>
              <Grid size={{xs: 12}}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                  error={Boolean(getFieldErr('password'))}
                  helperText={getFieldErr('password')}
                />
              </Grid>
              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  id="displayName"
                  label="Name"
                  name="displayName"
                  autoComplete="displayName"
                  value={user.displayName}
                  onChange={handleChange}
                  error={Boolean(getFieldErr('displayName'))}
                  helperText={getFieldErr('displayName')}
                />
              </Grid>

              <Grid size={{xs: 12}}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  error={Boolean(getFieldErr('phoneNumber'))}
                  helperText={getFieldErr('phoneNumber')}
                />
              </Grid>

              <Grid size={{xs: 12}}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={handleChange}
                  error={Boolean(getFieldErr('password'))}
                  helperText={getFieldErr('password')}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <NavLink to='/login'>
                  Already have an account? Sign In
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;