import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <NavLink to='/'>
      <h1 className="text-2xl font-bold">Admin de Tareas</h1>
      </NavLink>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <p>
              ¡Bienvenido {user.username}!
            </p>
            <li>
              <NavLink
              to='/add-task'
              className='bg-fuchsia-700 px-4 py-1 rounded-sm font-bold'
              >Añadir Tarea</NavLink>
            </li>
            <li>
              <NavLink
              to='/'
              className='bg-fuchsia-700 px-4 py-1 rounded-sm font-bold'
              onClick={()=>{logout()}}
              >Logout</NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
            <NavLink
            to='/login'
            className='font-bold'
            >Login</NavLink>
          </li>
          <li>
            <NavLink
            to='/register'
            className='bg-fuchsia-700 px-4 py-1 rounded-sm font-bold'
            >Registrarse</NavLink>
          </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar