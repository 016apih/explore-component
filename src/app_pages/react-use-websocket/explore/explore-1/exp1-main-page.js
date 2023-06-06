import React, { memo } from 'react';

import Exp1Header from "./layouts/exp1-header.js";
import Exp1Footer from './layouts/exp1-footer.js';
import Exp1Sidebar from './layouts/exp1-sidebar.js';
import Exp1MainLayout from './layouts/exp1-main-layout.js';

const Exp1MainPage = memo(() => {

   return (
      <>
         <Exp1Header />
         <div className="main-container px-0">
            <Exp1Sidebar />
            <Exp1MainLayout />
         </div>
         <Exp1Footer />
      </>
   )
})

export default Exp1MainPage;