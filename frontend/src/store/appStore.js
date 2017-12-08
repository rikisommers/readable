
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
  
    // fetch initial data error: actions must be basic object!
    // store.dispatch(getCategories());
    // store.dispatch(getPosts());
  
    return store;

  };
  
  export default appStore;



