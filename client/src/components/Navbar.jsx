import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 px-4 py-4 sm:flex sm:items-center sm:justify-between rounded-lg my-5">
      <section className='flex justify-between'>
        <NavLink to={
          isAuthenticated ? '/tasks' : '/'
        }>
        <h1 className="text-2xl font-bold hover:text-white">TareApp</h1>
        </NavLink>
        <button className="text-gray-700 sm:hidden">
          <svg className="w-6 h-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
            <path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
          </svg>
        </button>

      </section>
      <div className="flex flex-col items-start mt-3 gap-2 sm:flex-row sm:m-0">
        {isAuthenticated ? (
          <>
            <p className='mt-1'>
              ¡Bienvenido {user.username}!
            </p>
            <button>
              <NavLink
              to='/add-task'
              className='bg-fuchsia-700 hover:bg-fuchsia-600 px-4 py-1 rounded-sm font-bold'
              >Añadir Tarea</NavLink>
            </button>
            <button>
              <NavLink
              to='/'
              className='bg-fuchsia-700 hover:bg-fuchsia-600 px-4 py-1 rounded-sm font-bold'
              onClick={()=>{logout()}}
              >Logout</NavLink>
            </button>
          </>
        ) : (
          <>
            <button>
            <NavLink
            to='/login'
            className='font-bold hover:text-white'
            >Login</NavLink>
          </button>
          <button>
            <NavLink
            to='/register'
            className='bg-fuchsia-700 hover:bg-fuchsia-600 px-4 py-1 rounded-sm font-bold'
            >Registrarse</NavLink>
          </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar