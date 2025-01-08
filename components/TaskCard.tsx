import deleteTask from "@/app/actions/deleteTask"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"
import { Task } from "./FormComponent"
import changeTaskState from "@/app/actions/changeTaskState"


type Props = {
  task?: Task
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "changeState";
    id?: string;
    amount?: number;
  }) => void
}
export default function TaskCard({ task, updateOptimisticTasks }: Props) {
  const [ _, startTransition ] = useTransition()

  function deleteThisTask() {
    if (!task) return
    startTransition(() => updateOptimisticTasks({
      action: "delete",
      id: task.id
    }))
    deleteTask({ id: task.id, position: task.position! })
  }
  function changeState() {
    if (!task) return
    startTransition(()=>updateOptimisticTasks({
      action: "changeState",
      id: task.id,
    }))
    changeTaskState({ id: task.id, newState: !task.checked })
  }

  return (
    <li
      className={cn("w-[400px] flex flex-row cursor-pointer justify-between p-4 rounded-lg bg-blue-700", {
        'bg-green-400': task?.checked
      })}
      onClick={changeState}
    >
      <button
        className={cn("text-red-400 hover:bg-gray-800", {})}
        onClick={deleteThisTask}
      >
        X
      </button>
      <div 
        className="flex flex-row justify-center w-full"
      >
        {task?.label}
      </div>
    </li>
  )
}
