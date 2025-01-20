import { useState, useTransition } from "react"
import { v4 as uuid } from "uuid"
import { Task } from "@/utils/supabase/types";
import { Button } from "./ui/button";


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

  function addTask(data: FormData) {
    const id = uuid()
    const label = data.get('label') as unknown as string
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
        maxLength={60}
        name="label"
        onChange={(e)=>(setEventValue(e.target.value))}
        value={eventValue}
        className="dark:bg-zinc-800 px-4 font-light rounded-md w-full"
      />
      <Button
        type="submit"
        className="w-40 text-background rounded-md font-normal bg-foreground hover:bg-foreground/90"
      >
        New Task +
      </Button>
    </form>
  )
}
