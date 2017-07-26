import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

// Redux
import { Provider } from 'react-redux';
import { initStore } from './store/store';

import firebase from './firebase';

const store = initStore();

store.subscribe( () => {
  // This stuff happens everytime to store is updated
  const state = store.getState();
})

ReactDOM.render(<Provider store={store}>
                <App />
                </Provider>,
                document.getElementById('root'));
registerServiceWorker();
