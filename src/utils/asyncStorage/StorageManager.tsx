import { LocalStorage } from "./LocalStorage";

export class StorageManager extends LocalStorage {

    private static _instance: StorageManager;

    private constructor() {
        super();
    };

    public static getInstance(): StorageManager {
        if (!StorageManager._instance) {
            StorageManager._instance = new StorageManager();
        }
        return StorageManager._instance;
    };

    setItemInStorage = async (key: string, value: any): Promise<any> => {
        try {
            await this.setItem(key, value);
        } catch (err) {
            console.error('Error while storing data: ', err);
        }
    }

    getItemFromStorage = async (key: string): Promise<any> => {
        try {
            const data = await this.getItem(key);
            return data;
        } catch (err) {
            console.error('Error while getting the data from local storage: ', err);
        }
    }

    removeItemFromStorage = async (key: string): Promise<any> => {
        try {
            await this.removeItem(key);
        } catch (err) {
            console.error('Error while removing the data from local storage: ', err)
        }
    }

    clearStorage = async (): Promise<any> => {
        try {
            await this.clearStorage();
        } catch (err) {
            console.error('Error while clearing the data from local storage: ', err)
        }
    }
}