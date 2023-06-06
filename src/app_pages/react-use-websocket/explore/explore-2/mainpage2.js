import React, { memo } from 'react';

import { NetAppProvider } from './app-network';

const MainPage2 = memo(() => {
   return (
      <NetAppProvider>
         <div>MainPage2</div>
      </NetAppProvider>
   )
})

export default MainPage2