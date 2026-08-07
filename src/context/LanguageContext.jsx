import React, { createContext, useContext, useState } from "react"
import { translations } from "../utils/translations"

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ID")

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ID" ? "EN" : "ID"))
  }

  const t = translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
