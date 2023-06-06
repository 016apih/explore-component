import React, { memo, useRef, useEffect, useContext, useCallback, useState } from "react"

function useStoreData(){
   const store = useRef({
      isLogin: false,
      isLoading: false,
      isErr: false,
      errMsg: ""
   });

   const get = useCallback(() => store.current, []);

   const getVals = useCallback((arr) => {
      let nobj = {}
      for(let key in store.current){
         if(arr.indexOf(key) > -1){
            nobj = { ...nobj, [key]: store.current[key]}
         }
      }
      return nobj;
   },[])
   
   const subscribers = useRef(new Set);
   
   const setVal =  useCallback((key, value) => {
      store.current = { ...store.current, [key]: value };
      subscribers.current.forEach(callback => callback())
   }, []);
   
   const set = useCallback((value) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach(callback => callback())
   }, []);

   const subscribe = useCallback((callback) => {
      subscribers.current.add(callback);
      return () => subscribers.current.delete(callback);
   },[])

   return { get, getVals, set, setVal, subscribe }
}

const StoreContext = React.createContext(null);

const Provider = ({ children }) => {
   return (
      <StoreContext.Provider value={useStoreData()}>
         {children}
      </StoreContext.Provider>
   )
}

function useStore (selector) {
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

function ContextConnector(arr){
   const store = useContext(StoreContext);
   if(!store){
      throw new Error("Store not found")
   }
   /** start */
   const [state, setState] = useState(store.getVals(arr));

   useEffect(() => {
      return store.subscribe(() => setState(() => store.getVals(arr)) );
   }, [])

   return { ...state, setVals: store.set }
}

export { Provider, useStore, ContextConnector };


