import deleteTask from "@/app/actions/deleteTask"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import changeTaskState from "@/app/actions/changeTaskState"
import { useSortable } from "@dnd-kit/sortable"
import {CSS} from '@dnd-kit/utilities';
import { Card } from "./ui/card"
import { GripVertical, Trash2Icon } from "lucide-react"
import { Checkbox } from "./ui/checkbox"
import { Task } from "@/utils/supabase/types"
import TaskTitle from "./TaskTitle"

type Props = {
  task?: Task
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "changeState";
    id?: string;
    amount?: number;
  }) => void
  updateOptimisticTask: (action: {
    action: "update";
    newTask: Task;
  }) => void
  id: string
  overlay: boolean
  projectId: string
}
export default function TaskCard({ 
  task, 
  overlay, 
  updateOptimisticTasks, 
  updateOptimisticTask, 
  id, 
  projectId 
}
  : Props
) {
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
    deleteTask({ 
      id: task.id, 
      position: task.position!,
      projectId
    })
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
      className={cn(`w-full min-h-[60px] flex items-center cursor-default flex-row gap-x-4 justify-between rounded-lg bg-sidebar-background border-foreground group`, {
        'bg-opacity-100 shadow-none border-primary/0': task?.checked,
        'z-50 h-fit': isDragging,
        'invisible': isDragging && !overlay,
      })}
      ref={setNodeRef}
    >
      <div className={cn(`flex flex-row items-center cursor-default gap-x-4 justify-between transition-all
        p-4 rounded-lg bg-primary/5 w-full`, {
          'bg-primary/0 border border-primary/10': task?.checked
      })}>
      <div 
        { ...listeners }
        className={cn("cursor-grab", {
          'cursor-grabbing': overlay
        })}
      >
        <GripVertical 
          width={12}
          className={cn(``,{
            'text-primary/50': task?.checked
          })}
        />
      </div>
      <Checkbox
        onClick={changeState}
        checked={task?.checked}
        color={task?.checked ? '#1a4996' : ''}
        className={cn("w-5 h-5", {
        })}
      />
      <TaskTitle
        task={task!}
        updateOptimisticTask={updateOptimisticTask}
      />
      <button
        type="button"
        className={cn("text-foreground hover:text-destructive transition-all", {
          'text-primary/50': task?.checked
        })}
        onClick={deleteThisTask}
      >
        <Trash2Icon
          width={14}
        />
      </button>
      </div>
    </Card>
  )
}
