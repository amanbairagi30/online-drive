import { createContext, useContext, useState } from "react";

const NameErrorContext = createContext();

export const useNameErrorContext = () => {
    return useContext(NameErrorContext)
}

export const NameErrorProvider = ({ children }) => {
    const [nameError, SetNameError] = useState('')

    const value = {
        nameError,
        SetNameError,
    }

    return <NameErrorContext.Provider value={value}>{children}</NameErrorContext.Provider>
}