import { createContext, useReducer, useDispatch } from "react";

export const StoreContext = createContext({});

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

//REDUCER
const StoreReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/// PROVIDER
const StoreProvider = ({ children }) => {
  const INITIAL_STATE = {
    latLong: "",
    coffeeStores: [],
  };

  const [{ latLong, coffeeStores }, dispatch] = useReducer(
    StoreReducer,
    INITIAL_STATE
  );

  /// ACTIONS
  const setLatLong = (latLong) => {
    dispatch({ type: ACTION_TYPES.SET_LAT_LONG, payload: latLong });
  };

  const setCoffeeStores = (coffeeStores) => {
    dispatch({
      type: ACTION_TYPES.SET_COFFEE_STORES,
      payload: coffeeStores,
    });
  };

  const value = {
    latLong,
    setLatLong,
    coffeeStores,
    setCoffeeStores,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
