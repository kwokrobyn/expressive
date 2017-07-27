// Import Redux dependencies
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import reducers'
import userReducer from '../reducers/userReducer';
import checkExistReducer from '../reducers/checkExistReducer';
import ownedRoomsReducer from '../reducers/ownedRoomsReducer';
<<<<<<< HEAD
import fetchingReducer from '../reducers/fetchingReducer';

=======
import roomReducer from '../reducers/roomReducer';
>>>>>>> bryan

export let initStore = () => {

  // Combine reducers
  const reducer = combineReducers({
    user: userReducer,
    checkExist: checkExistReducer,
    ownedRooms: ownedRoomsReducer,
<<<<<<< HEAD
    isFetching: fetchingReducer
=======
    room: roomReducer
>>>>>>> bryan
  });

  // Create the store with all the reducers and allow for chrome redux dev tools to run and read reducers
  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
