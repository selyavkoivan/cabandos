import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/task/taskSlice';
import authReducer from './slice/auth/authSlice';
import userReducer from './slice/user/userSlice';
import chatReducer from './slice/chat/chatSlice';
import taskChangesReducer from './slice/task/taskChangesSlice';
import exceptionHandlingMiddleware from './middleware/exceptionHandlingMiddleware'

const store = configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer,
        taskChanges: taskChangesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(exceptionHandlingMiddleware),
});

export default store;