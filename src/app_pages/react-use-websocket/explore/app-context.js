import React from "react";

// create context
const AppContext = React.createContext({});

const ContextProvider = ({ ref, context, vars, actions, children  }) => {

   const sendAction = (actionName, parameter, internUpdateOnly = false) => {
      this.state.actions.sendAction(actionName, parameter, internUpdateOnly);
   }
   
   return (
      <context.provider 
         value={{ ...vars, ...actions }}
      >
         {children}
      </context.provider>
   )
}

export { ContextProvider, }