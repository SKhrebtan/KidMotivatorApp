import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'motivations',
  storage,
}

const motivationsSlice = createSlice({
    name: 'motivations',
    initialState: { items: [] },
    reducers: {
        addMotivation(state, { payload }) {
            state.items = [payload, ...state.items]
            // state.items.push(payload)
        },
        removeMotivation(state, {payload}) {
            state.items = state.items.filter(item => item.id !== payload);
        },
        completeMotivation(state, action) {
            const item = state.items.find(item => item.id === action.payload)
            item.completed = true;
        }
    }
})

export const persistedReducer = persistReducer(persistConfig, motivationsSlice.reducer)

export const { addMotivation, removeMotivation, completeMotivation } = motivationsSlice.actions;


