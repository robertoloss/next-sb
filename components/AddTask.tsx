import { useOptimistic, useState, useTransition } from "react"
import { v4 as uuid } from "uuid"
import { Task } from "./FormComponent";


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
  console.log("add task", projectId)

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
      <button 
        type="submit"
        className="w-40 h-10 bg-gray-700 hover:bg-gray-600"
      >
        Create!
      </button>
      <input 
        type="text" 
        name="label"
        onChange={(e)=>(setEventValue(e.target.value))}
        value={eventValue}
        className="bg-gray-900 w-full"
      />
    </form>
  )
}
