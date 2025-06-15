import { LOCAL_STORAGE_KEYS } from "../../utils/asyncStorage/LocalStorageKeys";
import { StorageManager } from "../../utils/asyncStorage/StorageManager";
import { Item } from "../slice/itemSlice";

interface RetryAction {
    action: 'add' | 'edit' | 'delete';
    item: Partial<Item>;
}

let retryQueue: RetryAction[] = [];

export const enqueueRetry = async (retry: RetryAction) => {
    retryQueue.push(retry);
    await saveQueueToStorage();
};

export const processRetryQueue = async () => {
    const queue = await loadQueueFromStorage();
    retryQueue = queue;

    for(const action of queue) {
        console.log('Pending action: ', action);
        // TODO: when implement api, if api call success then then remove from queue
    }
};

const loadQueueFromStorage = async () => {
    const _storageManager = StorageManager.getInstance();
    return await _storageManager.getItemFromStorage(LOCAL_STORAGE_KEYS.retry_queue) || [];
}

const saveQueueToStorage = async () => {
    const _storageManager = StorageManager.getInstance();
    await _storageManager.setItemInStorage(LOCAL_STORAGE_KEYS.retry_queue, retryQueue);
};