import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div>
          <h1 className="text-3xl text-center mb-4">Bienvenido a <span className='font-semibold	'>TareApp!!!</span> <br /> aquí podras crear, guardar, editar y eliminar cualquier tarea que necesites</h1>
          <h2 className="text-2xl text-center">Para empezar primero debes de
            <Link
            to='/register'
            className='hover:text-fuchsia-500 font-semibold underline decoration-fuchsia-500/30'> Registrate</Link></h2>
        </div>
      </div>
    </>
  )
}

export default HomePage