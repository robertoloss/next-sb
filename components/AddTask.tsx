import { useState, useTransition } from "react"
import { v4 as uuid } from "uuid"
import { Task } from "@/utils/supabase/types";
import { Button } from "./ui/button";
import { cn } from "./lib/utils";


type Props = {
  createTaskAction: ({ id, label, projectId }: { id: string; label: string, projectId: string }) => Promise<void>,
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "updatePositions";
    id?: string;
    label?: string;
    newPositions?: Task[]
  }) => void,
  projectId: string
}
export default function AddTask({ createTaskAction, updateOptimisticTasks, projectId }: Props) {
  const [ eventValue, setEventValue ] = useState('')
  const [ _, startTransition ] = useTransition()
  const [ error, setError ] = useState(false)

  function addTask(data: FormData) {
    const label = data.get('label') as unknown as string
    if (label.length === 0) {
      setError(true)
      return
    }
    const id = uuid()
    startTransition(() => updateOptimisticTasks({ 
      action: "create",
      label,
      id,
    }))
    createTaskAction({ id, label, projectId })
  }

  return (
    <form 
      className="flex flex-row gap-4"
      onSubmit={()=>setEventValue('')}
      action={addTask}
    >
      <input 
        type="text" 
        maxLength={40}
        name="label"
        onFocus={()=>setError(false)}
        onChange={(e)=>(setEventValue(e.target.value))}
        value={eventValue}
        className={cn("dark:bg-zinc-800 border dark:border-zinc-800 border-muted-foreground/50 px-4 font-light rounded-md w-full bg-stone-100", {
          'border dark:border border-destructive dark:border-destructive': error
        })}
      />
      <Button
        type="submit"
        className="w-40 min-w-[120px] text-background rounded-md font-normal bg-foreground hover:bg-foreground/90"
      >
        New Task +
      </Button>
    </form>
  )
}
