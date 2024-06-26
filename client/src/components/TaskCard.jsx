import { useTasks } from "../context/TasksContext";
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard({task}) {

  const { deleteTask } = useTasks() 

  const handleClick = ()=>{
    Swal.fire({
      title: "Estás seguro que deseas eliminar ésta tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background:'#27272a',
      color: '#ffffff',
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task._id)
        Swal.fire({
          title: "Tarea eliminada",
          icon: "success",
          background:'#27272a',
          color: '#ffffff',
      confirmButtonColor: "#a21caf",

        });
      }
    });
  }

  return (
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        <p>Fecha de creación: {new Date(task.date).toLocaleDateString()}</p>
        <div className="flex my-3 gap-2 items-center">
          <button
            className="bg-red-700 hover:bg-red-600 text-white rounded-md px-3 py-1"
            onClick={
              handleClick
              //()=>{
            //if(confirm('Estás seguro que deseas eliminar ésta tarea?')){deleteTask(task._id)}
          }
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