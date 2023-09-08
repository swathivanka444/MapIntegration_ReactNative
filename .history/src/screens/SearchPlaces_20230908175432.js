import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
const SearchPlaces = ({navigation}) => {
    const [CurrentLoc,setCurrentLocation]=useState("");
    const yourLocation={
        description:'Your Location',
        geometry:{location,CurrentLoc}
    };
    useEffect(()=>{
        Geolocation.getCurrentPosition(
            position=>{
                console.log('position**', position);
                setCurrentLocation({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                })
            },
            error=>{
                console.log('error in getcurrentlocation', error);
            }
        )
    },[])
    return (
        <View style={{ flex: 1 }}>
            <View style={{width:'100%',padding :20,height:'100%'}}>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    predefinedPlaces={[yourLocation]}
                    currentLocation={true}
                    currentLocationLabel='Current Location'
                    GooglePlacesDetailsQuery={{fields:'geometry'}}
                    query={{
                        key: "AIzaSyCsjTBny6NYkAB7Gb6v1WCajXjpyyikexU",
                        language: 'en',
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log("Data**********",data, details);
                        console.log("Details****",details);
                        console.log('searchDetails***',details.geometry.location,data);
                        navigation.replace('CurrentLocation',{
                            type:details.geometry.location,
                            text:data.description
                        })
                    }}
                    renderLeftButton={()=>{
                        <Icon 
                        name="chevron-left" 
                        size={20} 
                        color="black" 
                        onPress={()=>navigation.goBack()} 
                        style={{
                            // backgroundColor: COLORS.BaseBgColor,
                            verticalAlign: 'middle',
                            alignItems: 'center',
                            padding: 5,
                            height: 48,
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            marginLeft: 1,
                            width:48
                          }}
                        />
                    }}
            
                    textInputProps={{ 
                        // InputComp: Input,
                        // leftIcon: {
                        //   type: 'font-awesome',
                        //   name: 'chevron-left',
                        //   color: 'black',
                        //   size: 20,
                        // },
                        rightIcon: {
                          type: 'font-awesome',
                          name: 'search',
                          color: 'black',
                          size: 20,
                        },
                        errorStyle: {color: 'red'},
                      }}
                      styles={{
                        textInputContainer: {
                          backgroundColor: 'white',
                          marginVertical: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderWidth: 0.5,
                          borderColor: 'gray',
                        //   width: deviceWidth - 20,
                          alignSelf: 'center',
                          borderRadius: 5,
                        },
                        textInput: {
                          // height: 38,
                          color: '#5d5d5d',
                          fontSize: 16,
                          alignSelf: 'center',
                          marginHorizontal: 10,
                        },
                        predefinedPlacesDescription: {
                          color: '#1faadb',
                        },
                      }}
                />
            </View>
            <Text>SearchPlaces</Text>
        </View>

    )
}
export default SearchPlaces;