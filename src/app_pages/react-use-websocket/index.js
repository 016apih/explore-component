import WebSocketDemo from './sample.js';
import WebsocketWithContext from './webscoket-with-context.js';
// import WebsocketWithUseReducer from './webcoket-with-usereducer.js';
// import TestWebsocketContext from './context-websocket.js';

export { default as ReactUseWebsocketPage } from './main-page.js';

export const reactUseWebsocketList = [
   { key: "websocketdemo", name: "WebSocketDemo", comp: WebSocketDemo },
   { key: "one-websocket", name: "WebsocketWithContext", comp: WebsocketWithContext },

]