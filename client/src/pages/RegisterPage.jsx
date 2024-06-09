import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className='bg-zinc-700 max-w-md p-10 rounded-md'>
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
          <div key={i} className='bg-red-500 p-2 text-white rounded-sm'>{error}</div>
        ))
        }
        <button type='submit' >Registro</button>
      </form>
    </div>
  )
}

export default RegisterPage