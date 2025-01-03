import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './task/tasksSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store;