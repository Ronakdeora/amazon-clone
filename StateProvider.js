import React, { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {/* is the Provider, there is a hook that is usereducer which creates
        a data layer with intial state = intial state and to change that initial state 
        a fuction reducer= reducer */}
        {/* and the StateProvider is a function that can shift 
        that data layer domain wherever it is being exported . In our case that is
        the index.js*/}
        {children}
    </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
// 
