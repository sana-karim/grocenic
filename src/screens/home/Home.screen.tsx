import React, { useEffect, useState } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { ScreenLayout } from '../../components/screen_layout/ScreenLayout';
import { HomeHeader } from '../../components/headers/HomeHeader';
import styles from './Home.style';
import { SubHeader } from '../../components/headers/SubHeader.component';
import { ListItem } from '../../components/list/ListItem.component';
import { GrocenicTheme } from '../../theme/GrocenicTheme';
import { PrimaryButton } from '../../components/buttons/PrimaryButton.component';
import { AddItemModal } from '../../components/modals/addItem/AddItem.modal';
import { ContextMenuItemTypes } from '../../components/contextMenu/utils/ContextMenuItemTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteItem, syncLocalItemsToRedux } from '../../redux/thunks/itemsThunks';

interface HomeProps {
    navigation?: NavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [editItem, setEditItem] = useState<any | null>(null);
    const items = useAppSelector(store => store.items);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(syncLocalItemsToRedux());
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

    const renderItem = ({ item }: { item: any }) => {
        return (
            <ListItem
                id={item.id}
                itemLabel={item.name}
                quantity={item.quantity}
                onOptBtn={onOptBtn}
            />
        )
    };

    const renderList = () => {
        return (
            <FlatList
                data={items?.items}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                // ListFooterComponent={<View style={{ marginBottom: 0 }} />}
                contentContainerStyle={{
                    paddingTop: GrocenicTheme.spacing.sm,
                    paddingBottom: GrocenicTheme.spacing.sm
                }}
            />
        )
    };

    const renderUi = () => {
        return (

            <View style={styles.listAndBtnContainer}>
                {renderList()}
            </View>
        )
    };

    return (
        <ScreenLayout headerComponent={<HomeHeader />}>
            {renderSubHeader()}
            {renderUi()}
            {renderButton()}
            {renderModal()}
        </ScreenLayout>
    )

};