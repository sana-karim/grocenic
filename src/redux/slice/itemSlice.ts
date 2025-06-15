import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface Item {
    id?: string | number;
    name: string;
    quantity?: string;
    shared: boolean;
    synced?: boolean; 
}

interface ItemsState {
    items: Item[];
    loading: boolean;
    error: string | null;
}

const initialState: ItemsState = {
    items: [],
    loading: false,
    error: null
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        
        setItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<Item>) {
            state.items.push(action.payload);
        },
        updateItem(state, action: PayloadAction<Item>) {
            const index = state.items.findIndex(i => i.id === action.payload.id);
            if(index!== -1) state.items[index] = action.payload;
        },
        deleteItem(state, action: PayloadAction<string | number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        }
    }
});

export type {Item};
export const itemsState = (state: RootState) =>state.items;
export const {setItems, addItem, updateItem, deleteItem, setLoading, setError} = itemSlice.actions;
export default itemSlice.reducer;