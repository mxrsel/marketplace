import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store.ts';
import axiosApi from "../../axiosApi.ts";
import {GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError} from "../../types.ts";

export const register = createAsyncThunk<
    RegisterResponse,
    RegisterMutation,
    {rejectValue: ValidationError}
>(
    'users/register',
    async (registerMutation: RegisterMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/register', registerMutation);
          console.log(response.data);
            return response.data;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);

export const logout = createAsyncThunk<void, void, {state: RootState}>(
    'users/logout',
    async (_, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete(`/users/logout`, {headers: {'Authorization': token}});
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);
