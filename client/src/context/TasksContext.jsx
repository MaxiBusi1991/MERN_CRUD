import { createContext, useContext, useState } from "react";

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

  return(
    <TasksContext.Provider value={{
      tasks
    }}>
      {children}
    </TasksContext.Provider>
  )
}