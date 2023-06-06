import { useEffect } from "react";
import { useState } from "react";

const useFetch = (path) => {
   const [isReady, setIsReady] = useState(false);
   const [isError, setIsError] = useState(null);
   const [data, setData] = useState(null);

   const GetData = async() => {
      try {
         const mainUrl = `https://jsonplaceholder.typicode.com/${path}`;
         const req = await fetch(mainUrl);
         const jsonResp = req.json();
         setData(jsonResp);
         setIsReady(true);
      } catch (err) {   
         setIsError(err.message)
         
      }
   }

   useEffect(() => {
      GetData()
   }, [])

   return [data, isReady, isError]
}

export default useFetch;