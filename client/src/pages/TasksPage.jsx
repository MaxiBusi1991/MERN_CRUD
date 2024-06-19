import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from '../components/TaskCard'


function TasksPage() {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if(tasks.length === 0) return(
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <h1 className="text-2xl font-medium text-center">Aún no tienes Tareas...<br/><br/>Para añadir una nueva dale al botón de "Añadir tarea"</h1>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))

      }
    </div>
  )
}

export default TasksPage