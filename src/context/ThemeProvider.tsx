/* eslint-disable react-refresh/only-export-components */

import React, {  Dispatch, ReactNode, createContext, useState } from 'react';


type contextProviderProps = {
    children: ReactNode
}

type contextUseState = {
    dark:boolean;
    setDark: Dispatch<React.SetStateAction<boolean>>
}

export const contextProvider = createContext<contextUseState | undefined>(undefined)

const ThemeProvider = ({children}:contextProviderProps) => {
    const [dark,setDark] = useState(false)
    const values = {
        dark,
        setDark
    }
    return <contextProvider.Provider value={values}>
        {children}
    </contextProvider.Provider>
};

export default ThemeProvider;