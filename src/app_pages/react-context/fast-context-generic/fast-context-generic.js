import React, { useRef, useCallback, useContext, useState, useEffect } from "react";

import './fast-contest.css';

// create initial Context
function useStoreData(){
   const store = useRef({
      first: "", 
      last: ""
   });

   const get = useCallback(() => store.current, []);

   const subscribers = useRef(new Set);

   const set = useCallback((value) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach(callback => callback())
   }, []);

   const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
   },[])

   return { get, set, subscribe }
}

// create context
const StoreContext = React.createContext(null);

const Provider = ({ children }) => {
   return (
      <StoreContext.Provider value={useStoreData()}>
         { children }
      </StoreContext.Provider>
   )
}

function useStore (selector) {
   console.log("selector", selector,  typeof(selector))
   const store = useContext(StoreContext);
   if(!store){
      throw new Error("Store not found")
   }

   /** start */
   const [state, setState] = useState(() => selector(store.get()));
   
   useEffect(() => {
      return store.subscribe(() => setState(() => selector(store.get())) );
   }, [])
   /** end */

   /* fungsi start-end dapat di ubah menjadi ini jika menggunakan react versi 18.
      const state = useSyncExternalStore(store.subscribe, () =>
         selector(store.get())
      );
   */

   return [state, store.set]
}

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