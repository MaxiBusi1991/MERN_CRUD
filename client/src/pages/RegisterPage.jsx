import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {

  const {register, handleSubmit, formState: { errors }} = useForm();
  const { singup, isAuthenticated, errors: registerErrors  } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks'); 
  }, [isAuthenticated])

  const onSubmit = handleSubmit( async (values) => {        
    singup(values);  
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <form onSubmit={onSubmit} >
          <input type="text" {...register('username', {required: true})}
          className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre de Usuario' />
          {errors.username && (<div className='my-1'><p className='text-red-500 text-sm my-1'>Nombre de usuario requerido</p></div>)}

          <input type="email" {...register('email', {required: true})}
          className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='e-mail' />
          {errors.email && (<div className='my-1'><p className='text-red-500 text-sm my-1'>E-mail requerido</p></div>)}


          <input type="password" {...register('password', {required: true})}
          className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
          {errors.password && (<div className='m-1'><p className='text-red-500 text-sm'>La contraseña es requerida</p></div>)}
          {
          registerErrors.map((error, i)=>(
            <div key={i} className='bg-red-500 p-2 text-white rounded-sm m-2'>{error}</div>
          ))
          }
          <button type='submit' >Registro</button>
        </form>
        <p className='flex gap-x-2 justify-between mt-4'>Ya tienes una cuenta? <Link to={'/login'} className='text-fuchsia-500 font-bold'>Iniciar sesión!</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage