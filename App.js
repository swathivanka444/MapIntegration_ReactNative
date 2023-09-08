import React from 'react-native';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentLocation from './src/screens/CurrentLocation';
import Geocoder from 'react-native-geocoding';
import SearchPlaces from './src/screens/SearchPlaces';
Geocoder.init('Your API Key', {language: 'en'});
const App=()=>{
  const Stack=createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentLocation" component={CurrentLocation} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchPlaces" component={SearchPlaces} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
