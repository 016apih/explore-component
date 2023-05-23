import React from "react";
import { ContextProvider } from "./app-context";

var NetAppVars = {
   socketFlag: false,
   state: 'disconnected', // possible values of state: disconnected, connected, connecting
   url: 'wss://',
}

var NetAppActions = {
   getState: (vars, {outVars, socketID}) => console.log(vars, outVars, socketID)
}

const NetAppContext = React.createContext({});

export const NetAppProvider = (props) => (
   <ContextProvider context={NetAppContext} vars={NetAppVars} actions={NetAppActions}>
      {props.children}
   </ContextProvider>
);