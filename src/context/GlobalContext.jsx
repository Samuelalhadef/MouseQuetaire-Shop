'use client'

import { createContext, useState } from 'react'

export const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const value = {
    darkMode,
    toggleDarkMode
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}