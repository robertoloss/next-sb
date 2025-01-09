'use client'
import { useOptimistic } from "react"
import TaskList from "./TaskList";
import { Database } from "@/database.types";

export type Task = Database['checkbox']['Tables']['Task']['Row']

type Props = {
  updateTasksOrderAction: ({ newList }: { newList: any[] }) => Promise<void>
  createTaskAction: ({ id, label }: { id: string; label: string }) => Promise<void>
  tasks: Task[]
  projectId: string
}
export default function FormComponent({ projectId, createTaskAction, tasks, updateTasksOrderAction }: Props) {

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

  return (
    <TaskList 
      createTaskAction={createTaskAction}
      optimisticTasks={optimisticTasks}
      updateTasksOrder={updateTasksOrderAction}
      updateOptimisticTasks={updateOptimisticTasks}
      projectId={projectId}
    />
  )
}
