import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'; 

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root', // It says that we want to persist everything from the root level
  storage, // It helps to store in the local web storage
  blacklist : ['user']  //it helps us to blacklist whatever we dont want to persist, So userReducer has a AuthListener which migh conflict with the redux-persist, so we will black list it.
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
/**
 This line creates a new reducer by using persistReducer from Redux-Persist. 
 It takes two arguments: persistConfig (configuration for state persistence) and rootReducer (the combined reducer for your application's state). 
 This line creates a new reducer that has built-in state persistence functionality.
 */

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(
  Boolean
);
//production or development

const composeEnhancer = 
  (process.env.NODE_ENV !== 'production' && 
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers); 

/**
This line creates your Redux store. It uses the persistedReducer created in step 1 as the root reducer.
persistedReducer: This is the root reducer enhanced by Redux-Persist to handle state persistence. 
It specifies how your application's state should be managed, including what parts should be persisted.

Then it applies any middleware composed in step 2, and sets the initial state to undefined. 
The store is what you'll use to manage your application's state.

we use undefined to add any additional default states here, which makes it easier to test
We are using undefined because its an optional second parameter.
 */

export const persistor = persistStore (store);

/**
This line creates a persistor using Redux-Persist's persistStore function. 
The persistor is responsible for managing state persistence, allowing you to save and 
load your Redux state from local storage.
 */

/**
    Logger is something that allows us to see what the state looks like before 
    an action is dispatched according to the action
    and then how the state in turn looks after the action 

    Middlewares are kind of like little library helpers that run before an action hits the reducer. 
    So whenever you dispatch an action, before that action hits the reducers, it hits the middleware first. 
    So inorder to use the logger, we use middleware where we put the imported logger method 

    Inorder for these middleware to work, we have to call applyMiddleware. So we can say, 
    "hey these middlewares are actually something like enhancers" So in order for this to work,
    you have to generate it using compose like following:
            const ComposedEnhancers = compose(applyMiddleware(..middleWares))

 */