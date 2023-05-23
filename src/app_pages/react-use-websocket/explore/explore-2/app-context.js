import React, { memo } from "react";

const AppContext = React.createContext({});

const stateTemplate = {
   vars: {},
};

const actionTemplate = {
   init: function(circProvider, circState, actionDefs) {
      this.provider = circProvider;
      this.state = circState;
      this.actionDefs = {...actionDefs};
      console.log('actionDefs init', "circProvider: ", circProvider, circState, actionDefs);
      console.log(actionDefs);
   },
}

export const ContextProvider = memo(({ context, vars, actions, children}) => {

   // console.log("context", context)
   // console.log("vars", vars)
   // console.log("actions", actions)

   const dataContext = context;
   const state = { ...stateTemplate, vars, provider: context, actions: { ...actionTemplate}}
   const initVars = vars;
   const actionDefs = actions;

   state.actions.init(context, state, actionDefs);

   const ThisProvider = context;

   // console.log(context.Provider)

   return (
      <ThisProvider.Provider value={state}>
         {children}
      </ThisProvider.Provider>
   )
});
