import { useTasks } from "../context/TasksContext";
import {Link} from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard({task}) {

  const { deleteTask } = useTasks() 

  return (
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        <p>{new Date(task.date).toLocaleDateString()}</p>
        <div className="flex my-3 gap-2 items-center">
          <button
            className="bg-red-700 hover:bg-red-600 text-white rounded-md px-3 py-1"
            onClick={()=>{
            deleteTask(task._id)
          }}
          >Eliminar</button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-800 hover:bg-blue-700 text-white rounded-md px-3 py-1"
            >Editar</Link>
        </div>
        <p>{dayjs(task.date).utc().format('DD/MM/YYYY')}</p>
      </div>
  )
}

export default TaskCard