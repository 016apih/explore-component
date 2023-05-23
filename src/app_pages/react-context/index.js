import FastContext from './fast-context/fast-context.js';
import FastContextGeneric from './fast-context-generic/fast-context-generic.js';

export { default as ReactContextPage } from './react-context-page.js';

export const reactContextList = [
   { key: "fast-contest", name: "FastContext", comp: FastContext },
   { key: "fast-contest-generic", name: "FastContextGeneric", comp: FastContextGeneric }
]

export const defTabActive = reactContextList[1];