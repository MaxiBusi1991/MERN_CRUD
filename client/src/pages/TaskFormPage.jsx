import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TasksFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(()=>{
    async function loadTask() {
      if(params.id){
        const task = await getTask(params.id);
        console.log(task)
        setValue('title', task.title);
        setValue('description', task.description);

    }
    }
    loadTask();
  },[])

  const onSubmit = handleSubmit((data) =>{
    if(params.id){
      updateTask(params.id, data);
    }else{
      createTask(data);
    }
    navigate('/tasks');
  });

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