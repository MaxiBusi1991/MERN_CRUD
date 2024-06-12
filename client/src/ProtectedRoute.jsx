import { useAuth } from "./context/AuthContext"
import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute() {

  const { loading, isAuthenticated } = useAuth();

  if(loading) return <div className="flex justify-center items-center"><h1>Loading...</h1></div>
  if(!loading && !isAuthenticated) return <Navigate to={'/login'} replace/>  

  return <Outlet/>
}

export default ProtectedRoute