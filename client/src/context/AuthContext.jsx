import { createContext, useContext, useEffect, useState } from 'react';
import {loginRequest, registerRequest} from '../api/auth.js';

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
  const [errors, setErrors] = useState([])


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
    console.log(res);      
    } catch (error) {
      if(Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }; 

  useEffect(() => {
    if(errors.length > 0) {
      const timer = setTimeout(()=> {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])
  

  return(
    <AuthContext.Provider value={{
      singup,
      singin,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </AuthContext.Provider>
  )
}