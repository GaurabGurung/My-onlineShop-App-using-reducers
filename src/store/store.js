import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'; 

import { rootReducer } from './root-reducer';




const middelWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middelWares))

export const store = createStore(rootReducer, undefined, composedEnhancers) 
/**
  we use undefined to add any additional default states here, which makes it easier to test
  We are using undefined because its an optiuonal second parameter.
*/



/**
    Logger is something that allows us to see what the state looks like before 
    an action is dispatched according to the action
    and then how the state in turn looks after the action 

    Middlewares are kind of like little library helpers that run before an action hits the reducer. 
    So whenever you dispatch an action, before that action hits the reducers, it hits the middelware first. 
    So inorder to use the logger, we use middleware where we put the imprted logger method 

    Inorder for these middleware to work, we have to call applyMiddleware. So we can say, 
    "hey these middlewares are actually something like enhancers" So in order for this to work,
    you have to generate it using compose like following:
            const ComposedEnhancers = compose(applyMiddleware(..middleWares))

 */