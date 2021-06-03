import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./Home";
import List from "./List";
import Playlist from "./Playlist";
import Tracklist from "./Tracklist";
import Recent from "./Recent";
import Myplaylist from "./myplaylist";
const Stack = createStackNavigator();
export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Welcome' }}
                />
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Playlist" component={Playlist} />
                <Stack.Screen name="Tracklist" component={Tracklist} />
                <Stack.Screen name="Recent" component={Recent} />
                <Stack.Screen name="Myplaylist" component={Myplaylist} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const HomeScreen = ({ navigation, route }) => {
    return <button
        title="Go to Jane's profile"
        onClick={() => navigation.navigate('Profile', { name: 'Jane' })
        }
    >Go to Jane's profile</button >;
};
const ProfileScreen = ({ navigation, route }) => {

    return <> <Text>This is {route.params.name}'s profile</Text> <button
        title="Go to Jane's profile"
        onClick={() => navigation.navigate('Profile1', { name: 'Jane' })
        }
    >Go to Jane's profile</button > </>;
};
const ProfileScreen1 = ({ navigation, route }) => {
    return <Text>This is {route.params.name}'s profile

        <button
            title="Go to Jane's profile"
            onClick={() => navigation.navigate('Home', { name: 'Jane' })
            }
        >Go to Jane's profile</button >;
        </Text>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
