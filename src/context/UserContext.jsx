import { createContext, useReducer } from "react"


export const UserContext = createContext(null)


const UserProvider = ({children}) => {

    const user = {
        name:       'Christoph',
        isLoggedIn: false,
        friends:[
            {
                friends_id: 1,
                name: 'Gerd',
                isOnline: false 
            },
            {
                friends_id: 2,
                name: 'Hilde',
                isOnline: true
            }]
    }

    const actions = {
        LOGIN: 'login',
        CHANGESTATUS: 'changeStatus'
    }

// Reducer function, in der State geändert wird
    function reducer(state, action){
        
        // Der bestehende State ist in state gepseichert, welche Operation durchgeführt wird ist in action.type festgelegt
        switch(action.type){
            
            case actions.LOGIN:
               const myObjekt = {...state, isLoggedIn: !state.isLoggedIn }
                // Im return wird der neue State festgelegt
               return myObjekt 
            
                // Hier wird der online Status innerhalb des Freundes Array in einem Objekt geändert
               case actions.CHANGESTATUS:
                // Im action.payload findet ihr die übergebene friend_id 
                const friendsArray = state.friends.map( el => {
                    if (el.friends_id === action.payload){
                        return {...el, isOnline: !el.isOnline}
                    }else {
                        return el
                    }
                })
                return {...state, friends: friendsArray }
            
                // Default für das Error Handling
            default: 
                throw new Error() 
        }
    }


    const [state, dispatch] = useReducer(reducer, user)

    const exportData = {
        user: state,
        // mit der dispatch Funktion wird die reducer Funktion gestartet und das enthaltene Objekt weitergereicht
        toggleLogin: () => dispatch({type: actions.LOGIN}),
        changeStatus: (friend) => dispatch({type: actions.CHANGESTATUS, payload: friend})
    }

    return (
       <UserContext.Provider value={exportData}>
            {children}
       </UserContext.Provider> 
    )
}

export default UserProvider


