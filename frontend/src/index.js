import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom'

import App from './components/App';
import './styles/index.css';


import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';

import { Provider } from 'react-redux';

//import categories from './reducers';




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancers = (
    composeEnhancers(
        applyMiddleware(thunk)  
    )
);

const store = createStore(
    appReducer,
    enhancers
);
store.getState();




// TODO: hook up router

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter > 
        <App />
    </BrowserRouter>
</Provider>,

document.getElementById('root'));
