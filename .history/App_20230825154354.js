import React from 'react-native';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentLocation from './src/screens/CurrentLocation';
import SearchPlaces from './src/screens/SearchPlaces';
const App=()=>{
  const Stack=createStackNavigator();
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CurrentLocation" component={CurrentLocation} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchPlaces" component={SearchPlaces}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;