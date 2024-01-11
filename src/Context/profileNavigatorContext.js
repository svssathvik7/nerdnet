import React, { useState } from 'react'
export const profileNavigatorContextProvider = React.createContext(null);
export default function ProfileNavigatorContext({children}) {
    const [profileNavigator,setProfileNavigator] = useState(0);

  return (
    <profileNavigatorContextProvider.Provider value={{profileNavigator,setProfileNavigator}}>
        {children}
    </profileNavigatorContextProvider.Provider>
  )
}
