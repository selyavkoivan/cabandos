import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/task/taskSlice';
import authReducer from './slice/auth/authSlice';
import userReducer from './slice/user/userSlice';
import exceptionHandlingMiddleware from './middleware/exceptionHandlingMiddleware'

const store = configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(exceptionHandlingMiddleware),
});

export default store;