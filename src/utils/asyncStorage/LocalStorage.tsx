import AsyncStorage from '@react-native-async-storage/async-storage';

export abstract class LocalStorage {

    abstract setItemInStorage(key: string, value: any): Promise<any>;
    abstract getItemFromStorage(key: string): Promise<any>;
    abstract removeItemFromStorage(key: string): Promise<any>;
    abstract clearStorage(): Promise<any>;

    protected setItem = async (key: string, value: any): Promise<any> => {

        if (value == null || key.trim() === '') throw new TypeError('Invalid key value provided');

        const data = this.standardizeDataForStorage(value);

        try {
            await AsyncStorage.setItem(key, data);
        } catch (err) {
            console.error('Error while storing the data: ', err);
        }
    };

    protected getItem = async (key: string): Promise<string | null> => {

        if (key == null) throw new TypeError('Invalid key provided');

        try {
            let data = await AsyncStorage.getItem(key);
            if (data == null) return null;
            data = JSON.parse(data);
            return this.getDataInStandardFormatFromStorage(data);
        } catch (err) {
            console.error('Error while getting the data from local storage: ', err)
            return null;
        }
    }

    protected removeItem = async (key: string): Promise<any> => {

        if (key == null) throw new TypeError('Invalid key provided');

        try {
            let data = AsyncStorage.removeItem(key);
        } catch (err) {
            console.error('Error while removing the data from local storage: ', err)
        }
    }

    protected clear = async (): Promise<any> => {
        try {
            let data = await AsyncStorage.clear();
        } catch (err) {
            console.error('Error while clearing the data from local storage: ', err)
        }
    }

    private standardizeDataForStorage = (data: any): string => {
        const valueDataType = typeof data;
        return JSON.stringify({ type: valueDataType, data: data });
    };

    private getDataInStandardFormatFromStorage = (localStorageData: any): any => {
        const { type, data } = localStorageData;
        if (type === 'object' || type === 'number' || type === 'boolean') {
            return data;
        }
        return data;
    }

}