import { LOCAL_STORAGE_KEYS } from "../../utils/asyncStorage/LocalStorageKeys";
import { StorageManager } from "../../utils/asyncStorage/StorageManager";
import { addItem, Item, updateItem, deleteItem as deleteItemAction, setItems, } from "../slice/itemSlice";
import { AppDispatch, RootState } from "../store";
import uuid from 'react-native-uuid';
import { enqueueRetry, processRetryQueue } from "../utils/retryQueue";

const _storageManager = StorageManager.getInstance();

export const createItem = (itemData: Omit<Item, 'id'>) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const newItem: Item = {
        id: uuid.v4() as string,
        ...itemData,
        shared: itemData.shared ?? false,
        synced: false
    };

    const prev = await _storageManager.getItemFromStorage(LOCAL_STORAGE_KEYS.cart) || [];
    const updated = [...prev, newItem];
    await _storageManager.setItemInStorage(LOCAL_STORAGE_KEYS.cart, updated); //Storing all the items again and again. TODO: Change this logic if creating new item taking time or optimization issue
    dispatch(addItem(newItem));
    await enqueueRetry({action:'add', item: newItem});
};

export const editItem = (item: Item) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateItem(item));

    const updated = getState().items.items.map(i => i.id === item.id? item : i);
    await _storageManager.setItemInStorage(LOCAL_STORAGE_KEYS.cart, updated);
    await enqueueRetry({action:'edit', item});
};

export const deleteItem = (id: string | number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(deleteItemAction(id));

    const updated = getState().items.items.filter(i => i.id !== id);
    await _storageManager.setItemInStorage(LOCAL_STORAGE_KEYS.cart, updated);
    await enqueueRetry({action:'delete',item: {id}});
};

export const syncLocalItemsToRedux = () => async (dispatch: AppDispatch) => {
    const localItems: Item[] = await _storageManager.getItemFromStorage(LOCAL_STORAGE_KEYS.cart) || [];
    dispatch(setItems(localItems));
    await processRetryQueue();
};