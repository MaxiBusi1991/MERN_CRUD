import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import { useNavigate } from 'react-router-dom';

function TasksFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();


  const onSubmit = handleSubmit((data) =>{
    createTask(data);
    navigate('/tasks');
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1 className='font-bold text-2xl mb-2'>Crea tu tarea</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="text"
            placeholder="Titulo"
            autoFocus
            {...register('title')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            />

          <input 
            type="text"
            placeholder="Descripción"
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'

            />
          <button>Guardar</button>
        </form>
      </div>
    </div>
  )
}

export default TasksFormPage;