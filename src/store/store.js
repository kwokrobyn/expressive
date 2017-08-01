// Import Redux dependencies
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import reducers'
import userReducer from '../reducers/userReducer';
import checkExistReducer from '../reducers/checkExistReducer';
import ownedRoomsReducer from '../reducers/ownedRoomsReducer';
import fetchingReducer from '../reducers/fetchingReducer';
import roomReducer from '../reducers/roomReducer';
import questionReducer from '../reducers/questionReducer';
import statReducer from '../reducers/statReducer';
import pollReducer from '../reducers/pollReducer';

export let initStore = () => {

  // Combine reducers
  const reducer = combineReducers({
    user: userReducer,
    checkExist: checkExistReducer,
    ownedRooms: ownedRoomsReducer,
    isFetching: fetchingReducer,
    room: roomReducer,
    questions: questionReducer,
    stats: statReducer,
    poll: pollReducer
  });

  // Create the store with all the reducers and allow for chrome redux dev tools to run and read reducers
  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
