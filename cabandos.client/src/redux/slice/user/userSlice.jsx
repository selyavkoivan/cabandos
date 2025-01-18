import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';

export const fetchAllUsersAsync = createAsyncThunk(
    'user/fetchAllUsersAsync',
    async () => {
        const data = await userApi.fetchAllUsers();
        return data;
    }
);

export const fetchUsersByUsername = createAsyncThunk(
    'user/fetchUsersByUsername',
    async (username) => {
        const data = await userApi.fetchUsersByUsername(username);
        return data;
    }
);g

export const fetchUserByUsername = createAsyncThunk(
    'user/fetchUserByUsername',
    async (username) => {
        const data = await userApi.fetchUserByUsername(username);
        return data;
    }
);

export const fetchMe = createAsyncThunk(
    'user/fetchMe',
    async () => {
        const data = await userApi.fetchMe();
        return data;
    }
);

export const editUser = createAsyncThunk(
    'user/editUser',
    async (userDTO) => {
        await userApi.editUser(userDTO);
    }
);

export const editUserPassword = createAsyncThunk(
    'user/editUserPassword',
    async (passwordDTO) => {
        await userApi.editUserPassword(passwordDTO);
    }
);

const initialState = {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUsersByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserByUsername.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editUserPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(editUserPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;