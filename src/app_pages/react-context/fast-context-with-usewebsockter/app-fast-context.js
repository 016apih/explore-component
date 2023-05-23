import React, { memo, useRef, useEffect, useContext, useCallback, useState } from "react";
import { ReadyState } from 'react-use-websocket';

function useStoreData(){
   const store = useRef({
      isLogin: false,
      isLoading: false,
      isErr: false,
      errMsg: "",
      isConnection: false,
      isConnectionSocketId: false
   });

   const get = useCallback(() => store.current, []);

   const getVal = useCallback((key) => store.current[key], []);

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
   },[]);

   // create netAction
   const netAction = useRef(new Set);

   const onOpenHandler = useCallback((socketId, evt) => {
      let connectionStatus = {
         [ReadyState.CONNECTING]: 'Connecting',
         [ReadyState.OPEN]: 'Open',
         [ReadyState.CLOSING]: 'Closing',
         [ReadyState.CLOSED]: 'Closed',
         [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[evt.target.readyState];

      // console.log(evt, connectionStatus)
      netAction.current = { ...netAction.current,
         [`connectionStatus${socketId}`]: connectionStatus,
         [`sendAction${socketId}`]: (msg) => evt.target.send(msg)
      }
   }, []);

   const sendAction = useCallback((msg) => {
      netAction.current.sendAction(JSON.stringify(msg))
   },[]);

   const sendActionAux = useCallback((msg) => {
      netAction.current.sendActionAux(JSON.stringify(msg))
   },[]);

   const onCloseHandler = useCallback((socketId, evt) => {
      // console.log(evt);
   }, []);

   const onMessageHandler = useCallback((socketId, evt) => {
      console.log(`onMessageHandler ${socketId} :`, /* evt,*/ JSON.parse(evt.data));
      let { action_type, sub_type, status, data, session_id, ...p } = JSON.parse(evt.data);
      if(socketId === ""){
         if(action_type === "LOGIN-RESPONSE"){
            if(status === "OK"){
               sendActionAux({ user: getVal("user"), session_id, stringify: "true" })
               // return { ...state, ...action.respMsg, isErr: false, errMsg: "" }
            } else {
               // return { ...state, isErr: true, errMsg: action.respMsg.reason };
            }
         }
      }
      
   }, [])
   

   return { get, getVals, set, setVal, subscribe, 
      onOpenHandler, onCloseHandler, onMessageHandler,
      sendAction, sendActionAux 
   }
}

export const StoreContext = React.createContext(null);

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

   // console.log("useStore ke render")

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
   // console.log("ContextConnector ke render")

   useEffect(() => {
      return store.subscribe(() => setState(() => store.getVals(arr)) );
   }, []);

   return { ...state, setVals: store.set }
}

export function useNetAction () {
   const store = useContext(StoreContext);
   if(!store){
      throw new Error("Store not found")
   }
   // console.log("useNetAction ke render")
   return { sendAction: store.sendAction, sendActionAux: store.sendActionAux }
}

export { Provider, useStore, ContextConnector };


