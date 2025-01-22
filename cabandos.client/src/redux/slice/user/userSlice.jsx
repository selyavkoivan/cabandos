import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import NotificationManager from '../../../components/shared/notifications/NotificationManager'

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
    async (userDTO, { rejectWithValue }) => {
        try {
            return await userApi.editUser(userDTO.username, userDTO.userDTO);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const editUserPasswordAsync = createAsyncThunk(
    'user/editUserPassword',
    async (passwordDTO, { rejectWithValue }) => {
        try {
            return await userApi.editUserPassword(passwordDTO.username, passwordDTO.passwordDTO);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const uploadUserPhotoAsync = createAsyncThunk(
    'user/uploadUserPhoto',
    async (photoDTO, { rejectWithValue }) => {
        try {
            return await userApi.uploadUserPhoto(photoDTO.username, photoDTO.file);
        } catch (error) {
            return rejectWithValue(error);
        }
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
            })
            .addCase(editUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem('successedMessage', 'User profile updated successfully');
                window.location.replace('/profile/' + action.payload);
            })
            .addCase(editUserAsync.rejected, (state, action) => {
                state.loading = false;
                NotificationManager.showError(action.payload.error_description);
            })
            .addCase(editUserPasswordAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUserPasswordAsync.fulfilled, (state) => {
                state.loading = false;
                NotificationManager.showSuccess('Password updated successfully');
            })
            .addCase(editUserPasswordAsync.rejected, (state, action) => {
                state.loading = false;
                NotificationManager.showError(action.payload.error_description);
            })
            .addCase(uploadUserPhotoAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadUserPhotoAsync.fulfilled, (state) => {
                state.loading = false;
                localStorage.setItem('successedMessage', 'Profile avatar updated successfully');
                window.location.reload();
            })
            .addCase(uploadUserPhotoAsync.rejected, (state, action) => {
                state.loading = false;
                NotificationManager.showError(action.payload.error_description);
            });
    },
});

export default userSlice.reducer;