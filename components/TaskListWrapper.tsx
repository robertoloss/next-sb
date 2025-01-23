'use client'
import { useOptimistic } from "react"
import TaskList from "./TaskList";
import { Project, Task } from "@/utils/supabase/types";


type Props = {
  updateTasksOrderAction: ({ newList }: { newList: any[] }) => Promise<void>
  deleteProjectAction: ({ id }: { id: string }) => Promise<void>
  createTaskAction: ({ id, label, projectId }: { id: string; label: string; projectId: string }) => Promise<void>
  tasks: Task[]
  projectId: string
  project: Project | null
}
export default function TaskListWrapper({ 
  projectId, 
  createTaskAction, 
  tasks, 
  updateTasksOrderAction, 
  project,
  deleteProjectAction
}
  : Props
) {
  const [ optimisticTasks, updateOptimisticTasks ] = useOptimistic(
    tasks,
    (state, { action, id, label, newPositions } : {
      action: "create" | "delete" | "updatePositions" | "changeState",
      id?: string,
      label?: string,
      newPositions?: Task[]
    }) => {
      switch (action) {
        case "create":
          const dummyTask: Task = {
            id: id || "",
            label: label || "",
            created_at: new Date().toISOString(),
            description: null,
            position: -1,
            project: projectId,
            checked: false,
          };
          return [ dummyTask, ...state ]
        case "delete":
          return state.filter(e => e.id !== id)
        case "updatePositions":
          //console.log("update: ", newPositions)
          return newPositions || state
        case "changeState":
          return state.map(task => {
            if (task.id === id) {
              return { ...task, checked: !task.checked}
            } else {
              return task
            }
          })
      }
    }
  )

  const [ optimisticProject, updateOptimisticProject ] = useOptimistic(
    project, 
    (_ , { action, newProject } : {
      action: 'update',
      newProject: Project
    }) => {
      switch (action) {
        case 'update':
          return newProject
      }
    }
  )

  return (
      <TaskList 
        deleteProject={deleteProjectAction}
        createTaskAction={createTaskAction}
        optimisticTasks={optimisticTasks}
        updateTasksOrder={updateTasksOrderAction}
        updateOptimisticTasks={updateOptimisticTasks}
        projectId={projectId}
        project={optimisticProject}
        updateOptimisticProject={updateOptimisticProject}
      />
  )
}
