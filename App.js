import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createSharedElementStackNavigator} from "react-navigation-shared-element"
import TravelList from "./src/screens/TravelList"
import TravelDetails from "./src/screens/TravelDetails"

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createSharedElementStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="listPlaces"
            >

                <Stack.Screen name="listPlaces" component={TravelList} />

                <Stack.Screen name="details" component={TravelDetails} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({

})
