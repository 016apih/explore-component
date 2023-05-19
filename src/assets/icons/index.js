// export { default as chartIcon } from './chartIcon.svg';
export { default as arrowInIcon } from './ArrowsIn.svg';
export { default as tradViewIcon } from './trading-view.svg';

export const chartIcon = (color="#2B9CD1") => (
   <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 11H1V1" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 2L7 7L5 5L1 9" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 4.5V2H9.5" stroke={color} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
   </svg>
)