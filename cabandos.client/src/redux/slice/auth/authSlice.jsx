import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import NotificationManager from '../../../components/shared/notifications/NotificationManager';

export const signInAsync = createAsyncThunk(
    'auth/signInAsync',
    async (userDTO, { rejectWithValue }) => {
        try {
            return await authApi.signIn(userDTO);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signUpAsync = createAsyncThunk(
    'auth/signUpAsync',
    async (userDTO, { rejectWithValue }) => {
        try {
            return await authApi.signUp(userDTO);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const isLoginAsync = createAsyncThunk(
    'auth/isLogin',
    async () => {
        return await authApi.isLogin();
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async () => {
        return await authApi.logout();
    }
);

const initialState = {
    isLogin: JSON.parse(sessionStorage.getItem('isLogin')) || false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInAsync.fulfilled, (state, action) => {
                state.isLogin = true;
                sessionStorage.setItem('isLogin', true);

                sessionStorage.setItem('successedMessage', 'Sign in successed');
                window.location.replace('/');
            })
            .addCase(signInAsync.rejected, (state, action) => {
                state.isLogin = false;
                sessionStorage.setItem('isLogin', false);

                NotificationManager.showError(action.payload.detail);
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                sessionStorage.setItem('successedMessage', 'Sign up successed');
                window.location.replace('/signin');
            })
            .addCase(signUpAsync.rejected, (state, action) => {
                NotificationManager.showError(action.payload.detail);
            })
            .addCase(isLoginAsync.fulfilled, (state, action) => {
                state.isLogin = action.payload;
                sessionStorage.setItem('isLogin', action.payload);
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.isLogin = false;
                sessionStorage.setItem('isLogin', false);
                sessionStorage.setItem('me', null);
                NotificationManager.showInfo('Logout successed');
            });
    },
});

export default authSlice.reducer;
