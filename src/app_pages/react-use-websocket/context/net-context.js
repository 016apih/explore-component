import { memo, useEffect, useContext, createContext, useReducer, forwardRef, useImperativeHandle } from "react";

import useWebSocket, { ReadyState } from 'react-use-websocket';

import { url, url2 } from "../../../gitignore";

const getURL = { "": url, "Aux": url2 };

export const NetworkContext = createContext();

export const useNetwork = () => useContext(NetworkContext);

const NetworkVars = {
   isLogin: false,
   isLoading: false,
   isErr: false,
   errMsg: "",
}

const NetworkAction = {
   setVar: "setVar",
   setVars: "setVars",
   setEventVars: "setVars",
   mappingResp: "mappingResp",
   LOGIN_SUCCESS: "LOGIN_SUCCESS",
   LOGIN_FAILED: "LOGIN_FAILED",   
}
const NetworkReducer = (state, action) => {
   if(action.type === "setVar"){
      return { ...state, [action.key]: action.value }
   } else if(action.type === "setVars"){
      return { ...state, ...action.newState }
   } else if(action.type === "LOGIN_SUCCESS"){
      return { ...state, 
         isLoading: false, 
         isLogin: true
      }
   } else if(action.type === "LOGIN_FAILED"){
      return { ...state,
         isLoading: false,
         isLogin: false,
         isErr: true,
         errMsg: action.payload.errMsg
      }
   } else if(action.type === "mappingResp"){
      let { action_type, sub_type, status, data, session_id, ...p } = action.respMsg;
      // console.log("mappingResp", state)
      if(action_type === "LOGIN-RESPONSE"){
         if(status === "OK"){
            state.netActionAux.sendJsonMessage({ user: state.user, session_id, stringify: "true" })
            return { ...state, ...action.respMsg, isErr: false, errMsg: "" }
         } else {
            return { ...state, isErr: true, errMsg: action.respMsg.reason };
         }
      }
      return { ...state }
   } else if(action.type === "mappingRespAux"){
      let { action_type, sub_type, status, data, session_id, ...p } = action.respMsg;
      // console.log("mappingRespAux", state)
      if(action_type === "DF-RESPONSE"){
         if(status === "OK"){
            return { ...state, 
               isLoading: false, 
               isLogin: true
            }
         } else {
            return { ...state,
               isLoading: false,
               isLogin: false,
               isErr: true,
               errMsg: action.respMsg.reason
            };
         }
      }
      return { ...state }
   }
}

export const NetworkProvider = memo(({ children }) => {

   const [state, setStates] = useReducer(NetworkReducer, NetworkVars);

   return(
      <NetworkContext.Provider value={{ ...state, setStates }}>
         { children }
      </NetworkContext.Provider>
   )
});

// create Websocket
const connectionStatus = {
   [-1]: 'Uninstantiated',
   0: 'Connecting',
   1: 'Open',
   2: 'Closing',
   3: 'Closed',
}

export const WebsocketConnection = memo(({ socketId="" }) => {
   const vars = useNetwork();
   const { setStates } = vars;

   const onOpenHandler = (e) => {
      let { readyState } = e.target;
      setStates({ 
         type: "setVars", 
         newState: {
            [`socketFlag${socketId}`]: true,
            [`isConnection${socketId}`]: connectionStatus[readyState]
         }
      })
   }

   const onCloseHandler = (e) => {
      let { readyState } = e.target;
      setStates({ 
         type: "setVars", 
         newState: {
            [`socketFlag${socketId}`]: false,
            [`isConnection${socketId}`]: connectionStatus[readyState]
         }
      })
   }

   const onMessageHandler = (e) => {
      let respMsg = JSON.parse(e.data);
      setDataHandler(respMsg);
   }

   const setDataHandler = (msg) => {
      // console.log(`rendered ${socketId}`, vars)
      setStates({ type: `mappingResp${socketId}`, respMsg: msg });
      // let { action_type, sub_type, status, data, session_id } = msg;
      // if(socketId === ""){
      //    if(action_type === "LOGIN-RESPONSE"){
      //       if(status === "OK"){
      //          setStates({type: "setVars", newState: { ...msg } });
      //          vars.netActionAux.sendJsonMessage({ user: vars.user, session_id, stringify: "true" })
      //       } else {
      //          setStates({type: "LOGIN_FAILED", payload: { errMsg: msg.reason } });
      //       }
      //    }
      // } else {
      //    if(action_type === "DF-RESPONSE"){
      //       if(status === "OK"){
      //          setStates({type: "LOGIN_SUCCESS"});
      //       } else {
      //          setStates({type: "LOGIN_FAILED", payload: { errMsg: msg.reason }});
      //       }
      //    }
      // }
   }

   const ws = useWebSocket(getURL[socketId], {
      onOpen: onOpenHandler,
      onClose: onCloseHandler,
      onMessage: onMessageHandler
   });

   useEffect(() => {
      console.log(ws.readyState)
      if(ws.readyState === 1){
         setStates({ 
            type: "setVar", 
            key: `netAction${socketId}`, 
            value: ws
         })
      }
   }, [ws.readyState])

   return (<>
      <h5 className="alert alert-warning col-auto">
         status Websocket {socketId} : {vars[`isConnection${socketId}`]}
      </h5>
   </>)
})
