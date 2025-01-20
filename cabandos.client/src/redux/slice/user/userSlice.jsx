import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';

export const fetchAllUsersAsync = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const data = await userApi.fetchAllUsers();
        return data;
    }
);

export const fetchUsersByUsernameAsync = createAsyncThunk(
    'user/fetchUsersByUsername',
    async (username) => {
        const data = await userApi.fetchUsersByUsername(username);
        return data;
    }
);

export const fetchUserByUsernameAsync = createAsyncThunk(
    'user/fetchUserByUsername',
    async (username) => {
        const data = await userApi.fetchUserByUsername(username);
        return data;
    }
);

export const fetchMeAsync = createAsyncThunk(
    'user/fetchMe',
    async () => {
        const data = await userApi.fetchMe();
        return data;
    }
);

export const editUserAsync = createAsyncThunk(
    'user/editUser',
    async (userDTO) => {
        await userApi.editUser(userDTO);
    }
);

export const editUserPasswordAsync = createAsyncThunk(
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
            .addCase(fetchUsersByUsernameAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersByUsernameAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsersByUsernameAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserByUsernameAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserByUsernameAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserByUsernameAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchMeAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(editUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editUserPasswordAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserPasswordAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(editUserPasswordAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;