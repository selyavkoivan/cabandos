import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { taskApi } from './taskApi'; 


export const fetchTasksByStatus = createAsyncThunk(
    'tasks/fetchTasksByStatus',
    async () => {
        const data = await taskApi.fetchTasksByStatus();
        return data; 
    }
);

export const addTaskAsync = createAsyncThunk(
    'tasks/addTaskAsync',
    async (taskDTO) => {
        const newTask = await taskApi.addTask(taskDTO);
        return newTask;
    }
);

export const moveTaskAsync = createAsyncThunk(
    'tasks/moveTaskAsync',
    async (taskDTO) => {
        await taskApi.editTaskStatus({ ...taskDTO.task, status: taskDTO.toStatus });
        return taskDTO;
    }
);


export const deleteTaskAsync = createAsyncThunk(
    'tasks/deleteTaskAsync',
    async (task) => {
        await taskApi.deleteTask(task);
        return task;
    }
);

const initialState = {
    tasksGroup: []
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksGroup: (state, action) => {
            state.tasksGroup = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksByStatus.fulfilled, (state, action) => {
                state.tasksGroup = action.payload;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                const taskDTO = action.payload;
                const tasks = state.tasksGroup[Math.ceil(taskDTO.status / 10)].tasks.find(t => t.status == taskDTO.status).tasks;
                tasks.push(taskDTO);
            })
            .addCase(moveTaskAsync.fulfilled, (state, action) => {
                const taskDTO = action.payload;
                const task = taskDTO.task
                const toStatus = taskDTO.toStatus
                const tasksGroup = [...state.tasksGroup];

                const tasksToDelete = tasksGroup[Math.ceil(task.status / 10)].tasks.find(t => t.status == task.status).tasks;

                const index = tasksToDelete.findIndex(f => f.id === task.id);
                if (index !== -1) {
                    tasksToDelete.splice(index, 1);
                }

                const tasksToAdd = tasksGroup[Math.ceil(toStatus / 10)].tasks.find(t => t.status == toStatus).tasks;
                tasksToAdd.push({ ...task, status: toStatus })
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                const task = action.payload;
                const tasksGroup = [...state.tasksGroup];
                const tasks = tasksGroup[Math.ceil(task.status / 10)].tasks.find(t => t.status == task.status).tasks;
                const index = tasks.findIndex(f => f.id === task.id);
                if (index !== -1) {
                    tasks.splice(index, 1);
                }
            });
    },
});

export const { setTasksGroup } = tasksSlice.actions;

export default tasksSlice.reducer;