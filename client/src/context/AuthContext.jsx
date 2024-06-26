import { createContext, useContext, useEffect, useState } from 'react';
import {loginRequest, registerRequest, verifyTokenRequest} from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('el useAuth debe ser usado dentro de AuthProvider')
  }
  return context;
}

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);


  const singup = async(user) => {
    try {
      const res = await registerRequest(user)
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const singin = async(user) => {
    try {
    const res = await loginRequest(user);
    setIsAuthenticated(true);
    setUser(res.data)   
    } catch (error) {
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }; 

  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  useEffect(() => {
    if(errors.length > 0) {
      const timer = setTimeout(()=> {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

    if(!cookies.token){
      setIsAuthenticated(false);
      setLoading(false);
      return setUser(null);
    }
      try {
        const res = await verifyTokenRequest(cookies.token)
        if(!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null)
        setLoading(false);
      }
    }
    checkLogin();
  }, [])
  
  

  return(
    <AuthContext.Provider value={{
      singup,
      singin,
      logout,
      loading,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </AuthContext.Provider>
  )
}