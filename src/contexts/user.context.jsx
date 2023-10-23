import { createContext, useEffect, useReducer} from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';


//as the actual value you want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER : 'SET_CURRENT_USER'
}

export const userReducer = (state, action) => {


    const {type, payload} = action;

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser: payload
            }
        default :
        throw new Error (`Unhandled type ${type}`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider= ({children}) => {

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;

    const setCurrentUser = (user)=>{
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)  )
    }

    const value = {currentUser, setCurrentUser};


    useEffect (()=>{
        const unsubscribe = onAuthStateChangedListener ((user) => {
            if (user){
                createUserDocumentFromAuth(user);
            }
           setCurrentUser(user);
        });
        return unsubscribe;
    },[]);
 
    return (
        <UserContext.Provider value= {value}> {children} </UserContext.Provider> 
        // ".Provider" is the component that will wraps around any components that needs access to the values inside
 
    )
}

/**
 Note: Reducer
 const userReducer = (state, action) => {   
    return {
        currentUser: {...}
    }
 }   
 \\based on the "action" reducer changes the return values. 
 There are only two properties for the Action: Type and Payload (optional)
        Type: string (It represents what kind of actions do we have for the actions)
        Payload: It stores the value which is important for the reducer to know what to update the state's value with
\\"state" is the return object's value(s). It is used to derive whats the next return value should be. 
  

 */

