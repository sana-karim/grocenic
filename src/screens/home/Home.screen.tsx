import { NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, Image, View } from 'react-native';
import { PrimaryButton } from '../../components/buttons/PrimaryButton.component';
import { ContextMenuItemTypes } from '../../components/contextMenu/utils/ContextMenuItemTypes';
import { HomeHeader } from '../../components/headers/HomeHeader';
import { SubHeader } from '../../components/headers/SubHeader.component';
import { ListItem } from '../../components/list/ListItem.component';
import { AddItemModal } from '../../components/modals/addItem/AddItem.modal';
import { ScreenLayout } from '../../components/screen_layout/ScreenLayout';
import { PrimaryText } from '../../components/texts/PrimaryText';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteItem, syncLocalItemsToRedux } from '../../redux/thunks/itemsThunks';
import { GrocenicTheme } from '../../theme/GrocenicTheme';
import styles from './Home.style';
import { showToast } from '../../components/toasts/utils/showToast';
import { LOCAL_STORAGE_KEYS } from '../../utils/asyncStorage/LocalStorageKeys';
import { StorageManager } from '../../utils/asyncStorage/StorageManager';

interface HomeProps {
    navigation?: NavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any | null>(null);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const deletedItemsRef = useRef<any[]>([]);
    const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const items = useAppSelector(store => store.items);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(syncLocalItemsToRedux());
    }, []);

    useEffect(() => {
        return () => {
            if (undoTimeoutRef.current) {
                clearTimeout(undoTimeoutRef.current);
            };
        };
    }, []);

    const clearDeletedItemRef = useCallback(() => {
        deletedItemsRef.current = [];
    }, []);

    const clearUndoTimeout = () => {
        if (undoTimeoutRef.current) {
            clearTimeout(undoTimeoutRef.current);
            undoTimeoutRef.current = null;
        };
    };

    const selectedItemsArray = useMemo(() =>
        items.items?.filter(item => item.id != null && selectedItems.has(String(item.id))) || [],
        [items.items, selectedItems]
    );

    const handleMultiDelete = useCallback(async () => {
        const itemsToBeDelete = selectedItemsArray;
        if (itemsToBeDelete.length === 0) {
            return;
        }

        deletedItemsRef.current = itemsToBeDelete.map(item => {
            const index = items.items.findIndex(i => i.id === item.id);
            return { item, index };
        });

        try {
            // Batch delete: filter out all selected items at once
            const selectedIds = new Set(itemsToBeDelete.map(item => item.id));
            const newItems = items.items.filter(item => !selectedIds.has(item.id));
            // Dispatch setItems once
            dispatch({ type: 'items/setItems', payload: newItems });
            // Update local storage
            await StorageManager.getInstance().setItemInStorage(LOCAL_STORAGE_KEYS.cart, newItems);

            setSelectedItems(new Set());

            showToast({
                type: 'action',
                message: `${deletedItemsRef.current.length} item removed`,
                actionLabel: 'Undo',
                duration: 5000,
                backgroundColor: GrocenicTheme.toastColors.danger,
                onAction: () => {
                    undoDelete();
                },
            });

            clearUndoTimeout();

            undoTimeoutRef.current = setTimeout(() => {
                clearDeletedItemRef();
            }, 6000);

        } catch (err) {
            Alert.alert('Error', 'Failed to delete some items');
            deletedItemsRef.current = [];
        }

    }, [dispatch, selectedItemsArray, clearDeletedItemRef, items.items]);

    const undoDelete = useCallback(async () => {
        if (deletedItemsRef.current.length > 0) {
            try {
                let currentItems = [...items.items];
                const existingIds = new Set(currentItems.map(i => i.id));
                const toRestore = [...deletedItemsRef.current]
                    .filter(({ item }) => !existingIds.has(item.id))
                    .sort((a, b) => a.index - b.index);
                toRestore.forEach(({ item, index }) => {
                    currentItems.splice(index, 0, item);
                });
                dispatch({ type: 'items/setItems', payload: currentItems });
                await StorageManager.getInstance().setItemInStorage(LOCAL_STORAGE_KEYS.cart, currentItems);
                deletedItemsRef.current = [];
                clearUndoTimeout();
            } catch (err) {
                Alert.alert('Error', 'Failed to restore items');
            }
        }
    }, [dispatch, items.items]);

    const toggleItemSelect = useCallback((item: any) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(item.id)) {
                newSet.delete(item.id);
            } else {
                newSet.add(item.id);
            }
            return newSet;
        })
    }, []);

    const onPress = (item: any) => {
        console.log('onPress called')
        if (selectedItemsArray.length > 0) {
            toggleItemSelect(item);
        }
    }

    const selectAll = useCallback(() => {
        const allIds = new Set(items.items?.map(item => `${item.id}`) || []);
        setSelectedItems(allIds);
    }, [items.items]);

    const clearSelectAll = useCallback(() => {
        setSelectedItems(new Set());
    }, [])

    const onOptBtn = (data: any) => {
        if (data.type === ContextMenuItemTypes.EDIT) {
            setEditItem(data); //storing data here to pass default value to AddItemModal
            setShowModal(true);
        } else if (data.type === ContextMenuItemTypes.DELETE) {
            dispatch(deleteItem(data.id));
        }
    };

    const renderModal = () => {
        return (
            <AddItemModal
                show={showModal}
                onClose={
                    () => {
                        setShowModal(false);
                        setEditItem(null);
                    }
                }
                isEdit={Boolean(editItem)}
                defaultValue={editItem}
            />
        )
    };

    const renderButton = () => {
        return (
            <View style={styles.btnContainer}>
                <PrimaryButton
                    label='Add Item'
                    onPress={() => {
                        setShowModal(true);
                        setEditItem(null);
                    }}
                    containerStyle={styles.addItemBtnContainer}
                    labelStyle={styles.addItemBtn}
                />
            </View>
        )
    };

    const renderSubHeader = () => {
        return (
            <SubHeader headerLabel='Grocery List' />
        )
    };

    const renderItem = useCallback(({ item }: { item: any }) => {
        const isSelected = selectedItems.has(item.id);
        return (
            <ListItem
                id={item.id}
                itemLabel={item.name}
                quantity={item.quantity}
                isSelected={isSelected}
                onLongPress={() => toggleItemSelect(item)}
                onPress={() => onPress(item)}
                onOptBtn={onOptBtn}
            />
        )
    }, [selectedItems, toggleItemSelect, onPress, onOptBtn]);

    const renderList = () => {
        return (
            <FlatList
                data={items?.items}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                extraData={selectedItems}
                // ListFooterComponent={<View style={{ marginBottom: 0 }} />}
                contentContainerStyle={{
                    paddingTop: GrocenicTheme.spacing.sm,
                    paddingBottom: GrocenicTheme.spacing.sm
                }}
            />
        )
    };

    const renderEmptyList = (): React.ReactNode => {
        return (
            <View style={styles.emptyListContainer}>
                <Image source={require('../../assets/images/empty_icon.png')} />
                <PrimaryText text="Welcome to Grocenic" customStyle={styles.emptyListLabel} />
                <PrimaryText text="Your list is empty" customStyle={styles.emptyListStateLabel} />
            </View>
        )
    }

    const renderUi = () => {
        return (

            <View style={styles.listAndBtnContainer}>
                {
                    items.items.length > 0
                        ? renderList()
                        : renderEmptyList()
                }
            </View>
        )
    };

    return (
        <ScreenLayout headerComponent={<HomeHeader showDelete={!!selectedItems.size} showSelectAll={!!(selectedItems.size && items.items.length !== selectedItems.size)} onSelectAll={selectAll} showDeselectAll={(items.items.length === selectedItems.size && selectedItems.size !== 0)} onDeselectAll={clearSelectAll} onDelete={handleMultiDelete} />}>
            {renderSubHeader()}
            {renderUi()}
            {renderButton()}
            {renderModal()}
        </ScreenLayout>
    )

};