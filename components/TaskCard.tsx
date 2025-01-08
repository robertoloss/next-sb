import deleteTask from "@/app/actions/deleteTask"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"
import { Task } from "./FormComponent"
import changeTaskState from "@/app/actions/changeTaskState"
import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities';


type Props = {
  task?: Task
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "changeState";
    id?: string;
    amount?: number;
  }) => void
  id: string
}
export default function TaskCard({ task, updateOptimisticTasks, id }: Props) {
  const [ _, startTransition ] = useTransition()
  const { setNodeRef, listeners, attributes, isDragging, transform, transition } = useSortable({
    id,
    data: {
      position: task?.position
    }
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function deleteThisTask(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation()
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
      style={style}
      { ...attributes }
      className={cn("w-[400px] flex flex-row cursor-pointer justify-between p-4 rounded-lg bg-blue-700", {
        'bg-green-400': task?.checked,
        'z-50 cursor-grabbing': isDragging
      })}
      onClick={changeState}
      ref={setNodeRef}
    >
      <button
        type="button"
        className={cn("text-red-400 hover:bg-gray-800", {})}
        onClick={deleteThisTask}
      >
        X
      </button>
      <div 
        { ...listeners }
        className={cn("flex flex-row justify-center w-full hover: cursor-grab", {
          'cursor-grabbing': isDragging
        })}
      >
        {task?.label}
      </div>
    </li>
  )
}
