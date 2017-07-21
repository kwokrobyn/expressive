// Import Redux dependencies
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import reducers'
import userReducer from '../reducers/userReducer';

export let initStore = () => {

  // Combine reducers
  const reducer = combineReducers({
    user: userReducer
  });

  // Create the store with all the reducers and allow for chrome redux dev tools to run and read reducers
  const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;

}
