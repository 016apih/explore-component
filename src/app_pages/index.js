
import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';
import { AnyChartPage } from './anychart';
import { ReactUseWebsocketPage } from './react-use-websocket';
import { ReactContextPage } from './react-context';

export { default as MainPage } from './main-page.js';

export const options = [
   { key: "form", value: 'form', code: "code", name: "name", label: 'Form', comps: FormCard1 },
   { key: "agGrid", value: 'agGrid', code: "code", name: "name", label: 'Tabel Ag Grid', comps: AgGridPage },
   { key: "anyChart", value: 'anyChart', code: "code", name: "name", label: 'AnyChart', comps: AnyChartPage },
   { key: "react-use-webscoket", value: 'reactUseWebsocket', code: "code", name: "name", label: 'react-use-webscoket', comps: ReactUseWebsocketPage },
   { key: "exp-react-context", value: 'ReactContextPage', code: "code", name: "name", label: 'ReactContextPage', comps: ReactContextPage },
];

export const defaultOption = options[3];
