
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import appReducer from '../reducers';





const appStore = () => {

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


    store.subscribe(() => {
        localStorage.state = JSON.stringify(store.getState());
    });


    return store;

  };
  
  export default appStore;



