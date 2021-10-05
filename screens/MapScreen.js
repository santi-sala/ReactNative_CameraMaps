import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = (props) => {
  const initialLocation = props.navigation.getParam('initialLocation');
  const readonly = props.navigation.getParam('readonly');

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.00421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      //put alert here!!
      return;
    }
    props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({
      saveLocation: savePickedLocationHandler,
    });
  }, [savePickedLocationHandler]);

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        region={mapRegion}
        style={styles.map}
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker
            title="Picked Location"
            coordinate={markerCoordinates}
          ></Marker>
        )}
      </MapView>
    </View>
  );
};

MapScreen.navigationOptions = (navData) => {
  const saveFunction = navData.navigation.getParam('saveLocation');
  const readonly = navData.navigation.getParam('readonly');

  if (readonly) {
    return {};
  }
  return {
    headerRight: () => (
      <TouchableOpacity style={styles.headerButton} onPress={saveFunction}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  headerButton: {
    marginHorizontal: 20,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary,
  },
});

export default MapScreen;
