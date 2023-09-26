import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {

    const [ isLoading, setLoading ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const navigate = useNavigate();

    return <LoginContext.Provider value={{ isLoading, setLoading, isLoggedIn, setIsLoggedIn, navigate }}>
        {children}
    </LoginContext.Provider>
}

export const useLogin = () => useContext(LoginContext);