export const customStyles = {
   control: (base, state) => ({
      ...base,
      // match with the menu
      borderRadius: 0,
      // border: "var(--warna-d-border) 1px solid",
      // color : "white!important"
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
   })
};