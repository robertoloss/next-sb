import deleteTask from "@/app/actions/deleteTask"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"
import { Task } from "./FormComponent"
import changeTaskState from "@/app/actions/changeTaskState"
import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities';
import { Card } from "./ui/card"
import { GripVertical, Trash2Icon, TrashIcon } from "lucide-react"
import { Checkbox } from "./ui/checkbox"


type Props = {
  task?: Task
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "changeState";
    id?: string;
    amount?: number;
  }) => void
  id: string
  overlay: boolean
}
export default function TaskCard({ task, overlay, updateOptimisticTasks, id }: Props) {
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
    <Card
      style={style}
      { ...attributes }
      className={cn(`w-[400px] flex items-center cursor-default flex-row gap-x-4 justify-between p-4 rounded-lg 
        bg-background border-foreground/50`, {
        'bg-background border-foreground/10 shadow-none': task?.checked,
        'z-50 h-fit': isDragging,
        'invisible': isDragging && !overlay
      })}
      ref={setNodeRef}
    >
      <div 
        { ...listeners }
        className={cn("cursor-grab", {
          'cursor-grabbing': isDragging
        })}
      >
        <GripVertical 
          width={12}
          className={cn(``,{
            'text-secondary': task?.checked
          })}
        />
      </div>
      <Checkbox
        onClick={changeState}
        checked={task?.checked}
        color={task?.checked ? 'text-destructive' : ''}
        className={cn("w-5 h-5", {
        })}
      />
      <div 
        className={cn("flex flex-row justify-start w-full font-light", {
          'line-through text-secondary': task?.checked
        })}
      >
        {task?.label}
      </div>
      <button
        type="button"
        className={cn("text-secondary hover:text-destructive", {})}
        onClick={deleteThisTask}
      >
        <Trash2Icon
          width={14}
        />
      </button>
    </Card>
  )
}
