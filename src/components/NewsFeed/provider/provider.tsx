import React, { createContext, useReducer, useContext } from "react";
import { reducer, initialState, FeedState, ActionType } from "./redux";

// Create the Context with a default undefined value, asserting the expected type
const ClientStoreContext = createContext<{ state: FeedState; dispatch: React.Dispatch<ActionType> } | undefined>(undefined);

// Create a provider component to wrap the application
const ClientStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ClientStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ClientStoreContext.Provider>
  );
};

// Custom hook to easily access the store's state and dispatch
const useClientStore = () => {
  const context = useContext(ClientStoreContext);
  if (context === undefined) {
    throw new Error('useClientStore must be used within a ClientStoreProvider');
  }
  return context;
};

export { ClientStoreProvider, useClientStore };
