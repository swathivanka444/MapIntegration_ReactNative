import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import Geocoder from "react-native-geocoding";
import { SafeAreaView } from "react-native-safe-area-context";
const CurrentLocation = ({ navigation, route }) => {
  const [locValue, setLocValue] = useState("");
  const [refresh, setRefresh] = useState(0);
  const isFocussed = useIsFocused();
  const [markerCoords, setMarkerCoords] = useState({
    latitude: 17.385,
    longitude: 78.4867,
  });
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 17.385,
    longitude: 78.4867,
    latitudeDelta: 0.392768,
    longitudeDelta: 0.992736,
  });
  useEffect(() => {
    requestCameraPermission();
  }, [])
  const handleMapPress = (event) => {
    // const { latitude, longitude } = event.nativeEvent.coordinate;
    // const message = `Latitude: ${latitude}, Longitude: ${longitude}`;
    // // const message = "Latitude: " + latitude + ", Longitude: " + longitude;
    // alert(message);
    console.log('lon,lat', event.nativeEvent.coordinate);
    setMarkerCoords(event.nativeEvent.coordinate);
    reverseGeocodeCoordinates(
      event.nativeEvent.coordinate.latitude,
      event.nativeEvent.coordinate.longitude,
    );
  };
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
        getLocation();
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
        reverseGeocodeCoordinates(latitude, longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const handleIconPress = () => {
    navigation.navigate("SearchPlaces")
  }
  const params = route.params;
  console.log('local value**',locValue)
  console.log('routee-----', params);
  useEffect(() => {
    console.log('routee**', params);
    if (route && params && params.type) {
      setLocValue(params.text);
      reverseGeocodeCoordinates(params.type.lat, params.type.lng)
    }
  }, [refresh,isFocussed])
  console.log('markercoords**', markerCoords);
  const reverseGeocodeCoordinates = async (latitude, longitude) =>
  {
    console.log("longitude,latitude**", latitude, longitude);
    try {
      const response = await Geocoder.from(latitude, longitude);
      console.log("response***", response)
      const address = response.results[0].formatted_address;
      setLocValue(response.results[0].formatted_address);
      setMarkerCoords({
        latitude: response.results[0].geometry.location.lat,
        longitude: response.results[0].geometry.location.lng
      })
      setCurrentRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
      console.log('Address**', response);
      const pinCode = extractPincodeFromAddress(address);
      console.log("pinCode***", pinCode)
    }
    catch (error) {
      console.log('error in reverseGeocodeCoordinates', error);
    }
  }
  const extractPincodeFromAddress = (address) => {
    const pincodeRegex = /\b\d{6}\b/g; // Assumes a 6-digit pincode format
    const matches = address.match(pincodeRegex);
    return matches ? matches[0] : 'N/A';
  }

  return (
    <>

      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginHorizontal: 5, padding: 10 }}>
            <TextInput
              style={{ flex: 1,width:0 , }}
              // onChangeText={setText}
              value={locValue}
              placeholder="Search"
              backgroundColor='white'
              
            />
            <Icon name="search" size={20} color="black" onPress={handleIconPress} />
          </View>
          <MapView
            style={{ width: '100%', height: '80%' }}
            initialRegion={currentRegion}
            showsMyLocationButton
            showsUserLocation
            zoomTapEnabled
            scrollEnabled
            moveOnMarkerPress
            mapType="standard"
            zoomEnabled
            zoomControlEnabled
            userLocationAnnotationTitle="Your Location"
            onRegionChange={x => {
              console.log("x----", x);
            }}
            onPress={handleMapPress}
          >
            <Marker
              draggable
              tappable={true}
              rotation={3}
              onPress={event => handleMapPress(event)}
              onCalloutPress={event => handleMapPress(event)}
              onDragEnd={event => handleMapPress(event)}
              coordinate={markerCoords}
              title="Marker Title"
              description="This is the description of the marker"
            />
          </MapView>
        </View>
        <View  style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-between',
          paddingBottom: 20,
          paddingHorizontal: 10,
          backgroundColor:'white'
        }}>
        <Text style={{fontWeight:'bold',}}>Latitude : {markerCoords.latitude.toFixed(2)}</Text>
        <Text style={{fontWeight:'bold'}}>Longitude : {markerCoords.longitude}</Text>
        <Text style={{fontWeight:'bold'}}>Address : {locValue}</Text>
        {/* <Text style={{fontWeight:'bold'}}>PinCode: {params.text}</Text> */}
        </View>

        {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '90% ', height: '50', alignSelf: 'center', position: 'absolute', bottom: 20, backgroundColor: 'orange' }}
          onPress={() => { getLocation() }}>
          <Text style={{ color: '#fff' }}>Get current Location</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  )
};

export default CurrentLocation;
