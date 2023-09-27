import { createContext, useEffect, useReducer} from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

//as the actual value you want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    console.log('dispatched', new Date().toLocaleTimeString())
    console.log(action)
    const { type, payload } = action; 

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER :
            return {
                ...state,
                currentUser:payload
            }
        default:
            throw new Error (`unhandled type ${type} in userReducer`)    
    }


}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider= ({children}) => {

    // const [currentUser, setCurrentUser] = useState (null); instead of using useState, we can use useReducer as follow:
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); //Initial_state is the intial value for the state
    const {currentUser} = state; 
    //because state is the whole return object, we need to destructure currentUser. 
    //Or we can simply destructure directly right off the state in the above code like this: `const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);`
    
    console.log(currentUser, new Date().toLocaleTimeString());

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }
    
    const value = {currentUser, setCurrentUser};

    useEffect (()=>{
        const unsubscribe = onAuthStateChangedListener ((user) => {
            if (user){
                createUserDocumentFromAuth(user);
            }
           setCurrentUser(user)
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

