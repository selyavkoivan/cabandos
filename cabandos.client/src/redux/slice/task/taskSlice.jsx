import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from './taskApi';

import allowedMoves from '../../../assets/allowedMoves.json';
import taskStatusMap from "../../../assets/taskStatus.json";

export const fetchTaskChangesAsync = createAsyncThunk(
    'task/fetchTaskChanges',
    async (taskId) => {
        const data = await taskApi.fetchTaskChanges(taskId);
        return data;
    }
);

export const fetchTasksByStatusAsync = createAsyncThunk(
    'task/fetchTasksByStatus',
    async () => {
        const data = await taskApi.fetchTasksByStatus();
        return data;
    }
);

export const addTaskAsync = createAsyncThunk(
    'task/addTaskAsync',
    async (taskDTO) => {
        const newTask = await taskApi.addTask(taskDTO);
        return newTask;
    }
);

export const moveTaskAsync = createAsyncThunk(
    'task/moveTaskAsync',
    async (taskDTO) => {
        await taskApi.editTaskStatus({ ...taskDTO.task, status: taskDTO.toStatus });
        return taskDTO;
    }
);

export const deleteTaskAsync = createAsyncThunk(
    'task/deleteTaskAsync',
    async (task) => {
        await taskApi.deleteTask(task);
        return task;
    }
);

export const selectTaskStatusText = status => taskStatusMap[status] || "Unknown status";

const initialState = {
    tasksGroup: [],
    addingTaskStatus: false,
    allowedMoves,
    taskStatusMap,
    taskChanges: [], 
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasksGroup: (state, action) => {
            state.tasksGroup = action.payload;
        },
        setTaskChanges: (state, action) => {
            state.taskChanges = action.payload; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksByStatusAsync.fulfilled, (state, action) => {
                state.tasksGroup = action.payload;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                var taskDTO = action.payload;
                taskDTO.user = sessionStorage.getItem('me') && JSON.parse(sessionStorage.getItem('me'));
                const tasks = state.tasksGroup[Math.ceil(taskDTO.status / 10)].tasks.find(t => t.status == taskDTO.status).tasks;
                tasks.push(taskDTO);
            })
            .addCase(moveTaskAsync.fulfilled, (state, action) => {
                const taskDTO = action.payload;
                const task = taskDTO.task;
                const toStatus = taskDTO.toStatus;
                const tasksGroup = [...state.tasksGroup];

                const tasksToDelete = tasksGroup[Math.ceil(task.status / 10)].tasks.find(t => t.status == task.status).tasks;

                const index = tasksToDelete.findIndex(f => f.id === task.id);
                if (index !== -1) {
                    tasksToDelete.splice(index, 1);
                }

                const tasksToAdd = tasksGroup[Math.ceil(toStatus / 10)].tasks.find(t => t.status == toStatus).tasks;
                tasksToAdd.push({ ...task, status: toStatus });
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                const task = action.payload;
                const tasksGroup = [...state.tasksGroup];
                const tasks = tasksGroup[Math.ceil(task.status / 10)].tasks.find(t => t.status == task.status).tasks;
                const index = tasks.findIndex(f => f.id === task.id);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            })
            .addCase(fetchTaskChangesAsync.fulfilled, (state, action) => {
                state.taskChanges = action.payload;
            });
    },
});

export const { setTasksGroup, setTaskChanges } = taskSlice.actions;

export default taskSlice.reducer;
