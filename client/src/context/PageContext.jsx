import { useReducer } from "react";
import { createContext } from "react";

export const PageContext = createContext();

const pageReducer = (state, action) => {
    switch(action.type) {
        case "TOGGLE": {
            return {refresh: action.payload}
        }
        default: {
            return state
        }
    }
}

export const PageContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(pageReducer, {
        refresh: false
    })
    return (
        <PageContext.Provider value={{...state, dispatch}}>
            {children}
        </PageContext.Provider>
    )
}