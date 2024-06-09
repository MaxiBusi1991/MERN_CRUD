import { createContext, useContext, useState } from 'react';
import {registerRequest} from '../api/auth.js';

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

  return(
    <AuthContext.Provider value={{
      singup,
      user,
      isAuthenticated,
      errors,
    }}>
      {children}
    </AuthContext.Provider>
  )
}