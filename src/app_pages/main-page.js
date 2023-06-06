import React, { memo, useState } from 'react';

import { options, defaultOption } from './index.js';
import { SelectComponent } from '../app_components';
import { useEffect } from 'react';

const MainPage = memo(() => {
   const [ pageActive, setPageActive ] = useState(defaultOption);
   const [theme, setTheme] = useState("light");

   const componentActive = ( Component ) => {
      if(!Component){
         return <h5>jangan lupa import Componentnya</h5>
      }
      return <Component />
   }

   const setThemeMode = () => {
      let newTheme = theme === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", newTheme)
      document.querySelector("body").setAttribute("data-theme", newTheme);
      setTheme(newTheme);
   }

   useEffect(() => {
      let lastTheme = localStorage.getItem("themeMode");
      document.querySelector("body").setAttribute("data-theme", lastTheme);
      setTheme(lastTheme);
   }, [])

   return (<>
      <div className="row m-3" /*style={{  display: "none" }}*/>
         <div className="col-md-4">
            <SelectComponent
               options={options}
               onChange={setPageActive}
               value={pageActive}
            />
         </div>
         <div className="col-md-3">
            <div className="form-check form-switch">
               <input 
                  className="form-check-input" type="checkbox" role="switch" 
                  id="flexSwitchCheckChecked" 
                  checked={theme === "dark"}
                  onChange={setThemeMode}
               />
               <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                  {theme === "dark" ? "Dark" : "White"} Mode
               </label>
            </div>
         </div>
      </div>
      {
         componentActive(pageActive.comps)
      }
   </>)
});

export default MainPage;