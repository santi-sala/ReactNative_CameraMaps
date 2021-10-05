import React, { useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Platform,
  FlatList,
  Button,
  View,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import * as placesActions from '../store/places-actions';

const PlacesListScreeen = (props) => {
  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          address={itemData.item.address}
          title={itemData.item.title}
          onSelect={() =>
            props.navigation.navigate('PlaceDetail', {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

PlacesListScreeen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Place"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreeen;
