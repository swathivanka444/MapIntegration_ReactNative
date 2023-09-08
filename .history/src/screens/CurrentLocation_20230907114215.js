import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const CurrentLocation = () => {
  const [mLat, setMLat] = useState(0);
  const [mLong, setMlong] = useState(0);
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const message = `Latitude: ${latitude}, Longitude: ${longitude}`;
    // const message = "Latitude: " + latitude + ", Longitude: " + longitude;
    alert(message);
  };
  useEffect(() => {
    requestCameraPermission();
  }, [])
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your Location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('Error', err);
    }
  };
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('position', position);
        console.log('latitute', position.coords.latitude)
        setMLat(position.coords.latitude)
        setMlong(position.coords.longitude)
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', padding: 20, height: '100%' }}>
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
      <View style={{ flex:1,marginTop:0 }}>
        <MapView
          style={{ width: '100%', height: '100%' ,}}
          initialRegion={{
            latitude: 28.68465437595828,
            longitude: 77.21538993688628,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
          onRegionChange={x => {
            console.log("x----", x);
          }}
          onPress={handleMapPress}
        >
          <Marker
            draggable
            coordinate={{
              latitude: mLat,
              longitude: mLong,
            }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '90% ', height: '50', alignSelf: 'center', position: 'absolute', bottom: 20, backgroundColor: 'orange' }}
          onPress={() => { getLocation() }}
        >

          <Text style={{ color: '#fff' }}>Get current Location</Text>
        </TouchableOpacity>
      </View>
    </>
  )
};

export default CurrentLocation;
