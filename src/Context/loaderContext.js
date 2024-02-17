import React, { useState } from 'react'
export const loaderContextProvider = React.createContext(null);
export default function LoaderContext({children}) {
    const [isLoading,setIsLoading] = useState(false);
  return (
    <loaderContextProvider.Provider value={{isLoading,setIsLoading}}>
        {children}
    </loaderContextProvider.Provider>
  )
}
