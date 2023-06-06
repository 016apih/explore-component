const targetHeight = 30;

export const customStyles = {
   control: (base, state) => ({
      ...base,
      // match with the menu
      borderRadius: 0,
      // border: "var(--warna-d-border) 1px solid",
      // color : "white!important",
      /* select-sm */
      height: `${targetHeight}px!important`,
      minHeight: `${targetHeight}px!important`,
      paddingBottom: '0.02rem',
      fontSize: '.75rem',
      borderRadius: '0.01rem',
   }),
   menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
   }),
   menuList: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // color : "white!important"
      // height: `${targetHeight - 1 - 1}px`,
   }),
   // khusus cselect-sm
   valueContainer: base => ({
      ...base,
      padding: '0 8px',
   }),
   dropdownIndicator: base => ({
      ...base,
      padding: `${(targetHeight - 20 - 1 - 1) / 2}px`,
   }),
   option: base =>({
      ...base,
      height: `${targetHeight - 1 - 1}px`,
      padding: '0 8px',
   }),
   input: (base) => ({
      ...base,
      margin: '0px',
      height: `${targetHeight}px!important`,
      minHeight: `${targetHeight}px!important`,
      'input:focus': {
         boxShadow: 'none',
         border: '1px solid #60B3D1'
      }
   }),
};