import { useForm } from 'react-hook-form';
import {registerRequest} from '../api/auth.js'

function RegisterPage() {

  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit( async (values) => {        
    const res = await registerRequest(values)
    console.log(res)
  })

  return (
    <div className='bg-zinc-700 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit} >
        <input type="text" {...register('username', {required: true})}
        className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='Nombre de Usuario' />

        <input type="email" {...register('email', {required: true})}
        className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='e-mail' />

        <input type="pasword" {...register('password', {required: true})}
        className='w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2' placeholder='Contraseña' />

        <button type='submit' >Registro</button>
      </form>
    </div>
  )
}

export default RegisterPage