import React from 'react-native'
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
                        console.log(data, details);
                    }}
                    query={{
                        key: "Your API KEY here",
                        language: 'en',
                    }}
                />
            </View>
            <Text>SearchPlaces</Text>
        </View>

    )
}
export default SearchPlaces;