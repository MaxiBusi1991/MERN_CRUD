import { useTasks } from "../context/TasksContext";
import {Link} from 'react-router-dom';

function TaskCard({task}) {

  const { deleteTask } = useTasks() 

  return (
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        <p>{new Date(task.date).toLocaleDateString()}</p>
        <div className="flex my-3 gap-2 items-center">
          <button onClick={()=>{
            deleteTask(task._id)
          }}
          >Eliminar</button>
          <Link to={`/tasks/${task._id}`}>Editar</Link>
        </div>
      </div>
  )
}

export default TaskCard