import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import NotificationManager from '../../../components/shared/notifications/NotificationManager'

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


const initialState = {};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInAsync.fulfilled, (state, action) => {
                localStorage.setItem('successedMessage', 'Sign in successed');
                window.location.replace('/');
            })
            .addCase(signInAsync.rejected, (state, action) => {
                NotificationManager.showError(action.payload.detail);
            })
            .addCase(signUpAsync.fulfilled, (state, action) => {
                localStorage.setItem('successedMessage', 'Sign up successed');
                window.location.replace('/signin');
            })
            .addCase(signUpAsync.rejected, (state, action) => {
                NotificationManager.showError(action.payload.detail);
            })
            
    },
});

export default authSlice.reducer;