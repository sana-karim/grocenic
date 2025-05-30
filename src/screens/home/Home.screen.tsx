import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { ScreenLayout } from '../../components/screen_layout/ScreenLayout';
import { HomeHeader } from '../../components/headers/HomeHeader';
import styles from './Home.style';
import { SubHeader } from '../../components/headers/SubHeader.component';
import { GroceryData } from '../../constants/dataConstant';
import { ListItem } from '../../components/list/ListItem.component';
import { GrocenicTheme } from '../../theme/GrocenicTheme';

interface HomeProps {
    navigation?: NavigationProp<any>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

    const renderItem = ({ item }: { item: any }) => {
        return (
            <ListItem
                id={item.id}
                itemLabel={item.itemLabel}
                quantity={item.quantity}
            />
        )
    }

    const renderList = () => {
        return (
            <FlatList
                data={GroceryData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ marginBottom: 34 }} />}
                contentContainerStyle={{
                    paddingTop: GrocenicTheme.spacing.sm,
                    paddingBottom: GrocenicTheme.spacing.sm
                }}
            />
        )
    };

    const renderUi = () => {
        return (
            <View style={styles.listContainer}>
                {renderList()}
            </View>
        )
    };

    return (
        <ScreenLayout headerComponent={<HomeHeader />}>
            <SubHeader headerLabel='Grocery List' />
            {renderUi()}
        </ScreenLayout>
    )

};