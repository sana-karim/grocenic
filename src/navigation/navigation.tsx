import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';
import { Home } from '../screens/home/Home.screen';

export type RootStackParamList = {
    HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

function Profile() {
    return (
        <View>
            <Text style={{ color: 'black' }}>Profile</Text>
        </View>
    );
}

function NavigationTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "green",
                tabBarStyle: {
                    // backgroundColor: 'red',
                    height: 60,
                    borderColor: 'transparent',
                },

            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarItemStyle: { paddingTop: 8 },
                    tabBarLabelStyle: { paddingBottom: 8 },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image source={
                                focused
                                    ? require('../assets/images/add_item.png')
                                    : require('../assets/images/add_item.png')
                            } />
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarItemStyle: { paddingTop: 8 },
                    tabBarLabelStyle: { paddingBottom: 8 },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image source={
                                focused
                                    ? require('../assets/images/add_item.png')
                                    : require('../assets/images/add_item.png')
                            } />
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const MainNavigation = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="HomeBase" component={NavigationTabs} /> */}
                <Stack.Screen name="HomeScreen" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    )

}

export default MainNavigation;