import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slice/task/tasksSlice';
import authReducer from './slice/auth/authSlice';
import exceptionHandlingMiddleware from './middleware/exceptionHandlingMiddleware'

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(exceptionHandlingMiddleware),
});

export default store;