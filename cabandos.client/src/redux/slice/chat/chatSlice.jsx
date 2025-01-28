import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from './chatApi';
import NotificationManager from '../../../components/shared/notifications/NotificationManager';

export const fetchChatHistoryAsync = createAsyncThunk(
    'chat/fetchChatHistory',
    async ({ otherUserId, skip, take }, { rejectWithValue }) => {
        try {
            const data = await chatApi.fetchChatHistory(otherUserId, skip, take);
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const sendMessageAsync = createAsyncThunk(
    'chat/sendMessage',
    async ({ messageObject, websocket }, { rejectWithValue }) => {
        try {
            websocket.send(JSON.stringify(messageObject));
            return messageObject;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    messages: [],
    isLoading: false,
    isConnected: false,
    hasMoreMessages: true,
    error: null,
    websocket: null,
    message: '',
    loadCount: 10,
    scrollPosition: 0,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setWebSocket: (state, action) => {
            state.websocket = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatHistoryAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchChatHistoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages = [...action.payload.reverse(), ...state.messages];
                state.hasMoreMessages = action.payload.length > 0;
            })
            .addCase(fetchChatHistoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(sendMessageAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessageAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push(action.payload);
            })
            .addCase(sendMessageAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                NotificationManager.showError('Failed to send message');
            });
    },
});

export const {
    setWebSocket,
    setMessage,
    setIsConnected,
    addMessage,
    setScrollPosition,
    clearMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
