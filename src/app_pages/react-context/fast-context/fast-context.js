import React, { useRef, useCallback, useContext, useState, useEffect } from "react";

import './fast-contest.css';
import createFastContext from "../fast-context-generic/createFastContext";

const { Provider, useStore } = createFastContext({
   first: "",
   last: ""
});

const TextInput = ({ value }) => {
   const [fieldValue, setStore] = useStore(store => store[value]);
   return (
      <div className="field">
         {value}: &nbsp;
         <input
            value={fieldValue}
            onChange={e => setStore({ [value]: e.target.value })}
         />

      </div>
   )
}

const FormContainer = () => {
   return (
      <div className="container">
         <h5>FormContainer</h5>
         <TextInput value="first" />
         <TextInput value="last" />
      </div>
   )
}

const Display = ({ value }) => {
   const [ fieldValue ] = useStore(store => store[value]);
   return (
      <div className="value">
         { value} : {fieldValue}
      </div>
   )
}

const DisplayContainer = () => {
   return (
      <div className="container">
         <h5>DisplayContainer</h5>
         <Display value="first" />
         <Display value="last" />
      </div>
   )
}

const ContentContainer = () => {
   return(
      <div className="container">
         <h5>ContentContainer</h5>
         <FormContainer />
         <DisplayContainer />
      </div>
   )
}

function FastContext(){
   return (
      <Provider>
         <div className="container">
            <h5>FastContext</h5>
            <ContentContainer />
         </div>
      </Provider>
   )
}

export default FastContext;