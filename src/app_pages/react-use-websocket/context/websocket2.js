import { useEffect, createContext, useContext, useState } from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useReducer } from "react";

//create context & use hooks custom
export const WebsocketContext = createContext();
export const useWs = () => useContext(WebsocketContext);

// create reducer
const IntVars = {
   isLogin: false,
   isLoading: false,
   isErr: false,
   errMsg: ""
}
const VarsActions = {
   SET_STATE: "SET_STATE",
   SET_STATES: "SET_STATES",
   SET_DO_LOGIN: "SET_DO_LOGIN",
   LOGIN_SUCCESS: "LOGIN_SUCCESS",
   LOGIN_FAILED: "LOGIN_FAILED",
   SET_IS_ERROR: "SET_IS_ERROR",
   SET_ERR_MSG: "SET_ERR_MSG",
   SET_USER: "SET_USER",
}
const VarsReducer = (state, action) => {
   switch (action.type) {
      case VarsActions.SET_STATE:
         return { ...state, [action.key]: action.value }
      case VarsActions.SET_STATES:
         return { ...state, ...action.payload }
      case VarsActions.SET_DO_LOGIN:
         return { ...state, isLoading: true, user: action.payload.user }
      case VarsActions.LOGIN_SUCCESS:
         return { ...state, 
            isLoading: false, 
            isLogin: true
         }
      case VarsActions.LOGIN_FAILED:
         return { ...state,
            isLoading: false,
            isLogin: false,
            isErr: true,
            errMsg: action.payload.errMsg
         }
      case VarsActions.SET_IS_ERROR:
         return { ...state, isErr: true }
      default:
         break;
   }
}

const WebSocketProvider = ({ children }) => {
   const [vars, setVars] = useReducer(VarsReducer, IntVars);

   const ws1 = useWebSocket(process.env.URL);
   const ws2 = useWebSocket(process.env.URL2);

   const wsStatus1 = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[ws1.readyState];

   const wsStatus2 = {
      [ReadyState.CONNECTING]: 'Connecting',
      [ReadyState.OPEN]: 'Open',
      [ReadyState.CLOSING]: 'Closing',
      [ReadyState.CLOSED]: 'Closed',
      [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
   }[ws2.readyState];

   const sendWs = (payload) => ws1.sendJsonMessage(payload);
   const sendWsAux = (payload) => ws2.sendJsonMessage(payload);

   useEffect(() => {
      if(ws1.lastJsonMessage !== null){
         setDataHandler1(ws1.lastJsonMessage)
      }

      if(ws2.lastJsonMessage !== null){
         setDataHandler2(ws2.lastJsonMessage)
      }
   }, [ws1.lastJsonMessage, ws2.lastJsonMessage])

   const setDataHandler1 = (msg) => {
      if(typeof(msg) === "object"){
         let { action_type, sub_type, status, data, session_id } = msg;
         if(action_type === "LOGIN-RESPONSE"){
            if(status === "OK"){
               setVars({type: "SET_STATES", payload: msg });
               sendWsAux({ user: vars.user, session_id, stringify: "true" })
            } else {
               setVars({ type: "LOGIN_FAILED", payload: { errMsg: msg.reason }});
            }

            // ws2.sendJsonMessage({ user: vars.user, session_id, stringify: "true" })
         } else {
            console.log("NEW MSG : ", msg)
         }
      } else {
         // untuk string data
      }
   } 

   const setDataHandler2 = (msg) => {
      if(typeof(msg) === "object"){
         let { action_type, sub_type, status, data } = msg;
         if(action_type === "DF-RESPONSE"){
            if(status === "OK"){
               setVars({ type: "LOGIN_SUCCESS"});
            } else {
               setVars({ type: "LOGIN_FAILED", payload: { errMsg: msg.reason }});
            }
         } else {
            console.log("NEW MSG 2 : ", msg)
         }
      } else {
         // untuk string data
      }
   } 

   return (
      <WebsocketContext.Provider value={{ ws1, sendWs, sendWsAux, wsStatus1, ws2, wsStatus2, vars, setVars }}>
         {children}
      </WebsocketContext.Provider>
   )
}

export default WebSocketProvider;