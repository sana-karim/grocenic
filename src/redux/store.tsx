import { configureStore } from "@reduxjs/toolkit";
import itemSlice from './slice/itemSlice';

export const store = configureStore({
    reducer: {
        items: itemSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

