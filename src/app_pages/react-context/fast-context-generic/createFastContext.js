import React, { useRef, useCallback, useContext, useState, useEffect } from "react";

export default function createFastContext(){
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

   return {
      Provider,
      useStore,
   };
}
