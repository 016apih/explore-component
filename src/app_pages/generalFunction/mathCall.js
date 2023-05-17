export const setRupiah = (nStr, npoint = 0, defaultValue, defPostpend='') => {
   console.log(nStr)
   if(nStr && nStr !== "\xa0"){
      let num = (nStr * 1).toFixed(npoint);
      let x = num.toString().split(".");
      let x2 = x.length > 1 ? `.${x[1]}` : "";
      return x[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ x2 + defPostpend;
   } else {
      let cek = ["", null, "\xa0", undefined].indexOf(nStr) > -1
      return (cek && defaultValue !== undefined) ? defaultValue : (isNaN(nStr) ? '' : nStr);
   }
}