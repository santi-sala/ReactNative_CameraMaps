import { ADD_PLACE, DELETE_PLACE, SET_PLACES } from './places-actions';
import Place from '../models/place';

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.latitude,
              place.longitude
            )
        ),
      };
    case ADD_PLACE:
      const NewPlace = new Place(
        action.placeData.id.toString(),
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coordinates.latitude,
        action.placeData.coordinates.longitude
      );
      return {
        places: state.places.concat(NewPlace),
      };

    default:
      return state;
  }
};
