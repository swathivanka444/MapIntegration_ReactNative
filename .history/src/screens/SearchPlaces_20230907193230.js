import React from 'react'
import { View, Text } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const SearchPlaces = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{width:'100%',padding :20,height:'100%'}}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log("Data**********",data, details);
                    }}
                    query={{
                        key: "AIzaSyCsjTBny6NYkAB7Gb6v1WCajXjpyyikexU",
                        language: 'en',
                    }}
                />
            </View>
            <Text>SearchPlaces</Text>
        </View>

    )
}
export default SearchPlaces;