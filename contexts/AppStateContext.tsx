import React, { createContext, useReducer, useContext, useMemo, useState, useEffect } from "react";
import { DocumentData } from "@firebase/firestore";

type AppState =  {
      currentWard?: string,
      directions?: google.maps.DirectionsResult | undefined
      currentLocation?: google.maps.LatLngLiteral | undefined
      pollingCenter?: google.maps.LatLngLiteral | undefined
      pollingAddress?: { lat: number; lng: number; lga: string; }
      comments?: DocumentData[]
    };

type Action =
    { type: "INIT_STORED"; payload: AppState }
  | { type: "SET_CURRENT_WARD"; payload: string }
  |  { type: "SET_CURRENT_LOCATION"; payload: google.maps.LatLngLiteral | undefined }
  |  { type: "SET_POLLING_LOCATION"; payload: google.maps.LatLngLiteral | undefined }
  |  { type: "SET_POLLING_ADDRESS"; payload: { lat: number; lng: number; lga: string; } }
  |  { type: "SET_DIRECTION"; payload: google.maps.DirectionsResult }
  |  { type: "SET_COMMENTS"; payload: DocumentData[] }

interface AppProviderProps {
  children: React.ReactNode;
}

const initialState = {
  currentWard: '',
  directions: undefined,
  currentLocation: undefined,
  comments: []
};

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "INIT_STORED":
      return {
        currentWard: action.payload.currentWard,
        directions: action.payload.directions,
        currentLocation: action.payload.currentLocation,
        comments: action.payload.comments,
      };
    case "SET_CURRENT_WARD":
      return {
        ...state,
        currentWard: action.payload,
      };
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
      };
      case "SET_POLLING_LOCATION":
        return {
          ...state,
          pollingLocation: action.payload,
        };
        case "SET_POLLING_ADDRESS":
          return {
            ...state,
            pollingAddress: action.payload,
          };
      case "SET_DIRECTION":
      return {
        ...state,
        directions: action.payload,
      };
      case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

function AppStateProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
 }, [state, dispatch]);

 useEffect(() => {
  console.log('state viewed from useEffect >>>>>>>>>>>>>>>>>>>>', state)
}, [state])

useEffect(() => {

  const storedState = localStorage.getItem("state")
  const stateObj = storedState && JSON.parse(storedState) 
  console.log('Is there a stored state', stateObj)
  
  if (stateObj) { 
    //checking if there already is a state in localstorage
    dispatch({
      type: "INIT_STORED",
      payload: stateObj, 
    });
   console.log('There is a stored state')
  }
}, []);

useEffect(() => {
  if (state !== initialState) {
    localStorage.setItem("state", JSON.stringify(state)); 
    //create and/or set a new localstorage variable called "state"
  }
}, [state]);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export { AppStateContext, AppStateProvider };

export function useAppContext() {
  return useContext(AppStateContext);
}
