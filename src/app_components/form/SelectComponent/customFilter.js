export const customFilter = (option, searchText) => {
   let code = option.data.code?.toLowerCase()?.includes(searchText?.toLowerCase());
   let name = option.data.name?.toLowerCase()?.includes(searchText?.toLowerCase());

   if(searchText.toLowerCase().includes(' ')){
      if(name){
         return true;
      }
   } else {
      if (code) {
         return true;
      }
   }
};