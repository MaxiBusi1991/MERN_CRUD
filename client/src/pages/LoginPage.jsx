import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const { singin, errors: singinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    singin(data);
  });
  
  useEffect(()=>{
    if(isAuthenticated) navigate('/tasks')
  },[isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className='text-2xl font-bold'>Login</h1>
        <form onSubmit={onSubmit} >        
          <input type="email" {...register('email', {required: true})}
          className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='e-mail' />
          {errors.email && (<div className='my-1'><p className='text-red-500 text-sm my-1'>E-mail requerido</p></div>)}


          <input type="password" {...register('password', {required: true})}
          className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />
          {errors.password && (<div className='m-1'><p className='text-red-500 text-sm'>La contraseña es requerida</p></div>)}
          {
          singinErrors.map((error, i)=>(
            <div key={i} className='bg-red-500 p-2 text-white rounded-sm text-center m-2'>{error}</div>
          ))
          }
          <button type='submit' >Iniciar Sesión</button>
        </form>
        <p className='flex gap-x-2 justify-between mt-4'>No tienes una cuenta? <Link to={'/register'} className='text-sky-500 font-bold'>Registrarme!</Link></p>
      </div>
    </div>
  )
}

export default LoginPage