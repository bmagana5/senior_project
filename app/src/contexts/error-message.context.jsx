import { createContext, useState } from "react";

export const ErrorMessageContext = createContext({
    errorMessage: '',
    setErrorMessage: () => {},
    clearErrorMessage: () => {}
});

export const ErrorMessageProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const clearErrorMessage = () => {
        setErrorMessage(null);
    };

    const value = { errorMessage, setErrorMessage, clearErrorMessage };
    return <ErrorMessageContext.Provider value={value}>{children}</ErrorMessageContext.Provider>
}