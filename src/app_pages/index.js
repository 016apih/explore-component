
import { FormCard1 } from './form-page';
import { AgGridPage } from './tabel-aggrid';
import { AnyChartPage } from './anychart';
import { ReactUseWebsocketPage } from './react-use-websocket';
import { ReactContextPage } from './react-context';

export { default as MainPage } from './main-page.js';

export const options = [
   { id: 0, key: "form", value: 'form', code: "code", name: "name", label: 'Form', comps: FormCard1 },
   { id: 1, key: "agGrid", value: 'agGrid', code: "code", name: "name", label: 'Tabel Ag Grid', comps: AgGridPage },
   { id: 2, key: "anyChart", value: 'anyChart', code: "code", name: "name", label: 'AnyChart', comps: AnyChartPage },
   { id: 3, key: "react-use-webscoket", value: 'reactUseWebsocket', code: "code", name: "name", label: 'react-use-webscoket', comps: ReactUseWebsocketPage },
   { id: 4, key: "exp-react-context", value: 'ReactContextPage', code: "code", name: "name", label: 'ReactContextPage', comps: ReactContextPage },
];

export const defaultOption = options[4];
