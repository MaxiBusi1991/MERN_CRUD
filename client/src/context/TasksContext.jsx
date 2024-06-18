import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

const TasksContext =  createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);

  if(!context){
    throw new Error('el useTasks debe ser usado dentro de TaskProvider')
  }
  return context;
}

export function TaskProvider({children}) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  }

  return(
    <TasksContext.Provider
    value={{
      tasks,
      createTask,
      getTasks
    }}>
      {children}
    </TasksContext.Provider>
  )
}