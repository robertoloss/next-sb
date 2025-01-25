import updateTaskTitle from "@/app/actions/updateTaskTitle"
import { Task } from "@/utils/supabase/types"
import { Check, Pencil, X } from "lucide-react"
import { useEffect, useRef, useState, useTransition } from "react"
import { cn } from "./lib/utils"

type Props = {
  task: Task,
  updateOptimisticTask: (action: {
    action: "update";
    newTask: Task;
  }) => void
}
export default function TaskTitle({ task, updateOptimisticTask  }: Props) {
  const [ showTitleInput, setShowTitleInput ] = useState(false) 
  const initialInputValue = task.label!
  const [ inputValue, setInputValue ] = useState(initialInputValue)
  const [ _, startTransition ] = useTransition()

  const inputRef = useRef<HTMLInputElement>(null)

  function handleTitleClicked() {
    if (!showTitleInput) {
      setShowTitleInput(true)
    }
  }
  useEffect(() => {
    if (showTitleInput) {
      inputRef.current?.focus();
    }
  }, [showTitleInput]);

  async function updateTitle(data: FormData) {
    const newName = data.get('newName') as string
    const newTask = { ...task, label: newName }
    startTransition(()=> updateOptimisticTask({ 
      action: 'update',
      newTask
    }))
    const { res, error } = await updateTaskTitle({
      id: task?.id || '',
      newLabel: newName,
    })
    console.log({ res, error })
  }
  async function blurHandler(e: React.FocusEvent<HTMLInputElement, Element>) {
    const newName = e.target.value
    const newTask = { ...task, label: newName }
    startTransition(()=> updateOptimisticTask({ 
      action: 'update',
      newTask
    }))
    const { res, error } = await updateTaskTitle({
      id: task?.id || '',
      newLabel: newName,
    })
    console.log({ res, error })
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case "Enter":
        return
      case "Escape":
        handleCancel()
    }
  }
  function handleCancel() {
    setShowTitleInput(false) 
    setInputValue(initialInputValue)
  }

  return (
    <div 
      className="flex flex-row w-full mr-1 gap-x-4 group cursor-pointer"
    >
      {showTitleInput &&
        <form 
          onSubmit={()=>setShowTitleInput(false)}
          action={updateTitle}
          className={cn("flex flex-row items-center gap-x-4 h-[26px] w-full", {
            'h-[24px]': task.checked
          })}
        >
          <input 
            name="newName" 
            ref={inputRef}
            value={inputValue}
            maxLength={60}
            onChange={(e)=>setInputValue(e.target.value)}
            onBlur={(e)=>{
              setShowTitleInput(false)
              blurHandler(e)
            }}
            onKeyDown={handleInputKeyDown}
            type='text'
            className="flex w-full bg-transparent flex-row border-none focus:outline-none text-md font-light text-muted-foreground"
          />
          <div className="flex flex-row gap-x-1">
            <button
              type="submit"
            >
              <Check/>
            </button>
            <button 
              className="" 
              onClick={handleCancel}
            >
              <X/>
            </button>
          </div>
        </form>
      }
      {!showTitleInput && 
        <div 
          className="flex flex-row items-center gap-2 group/label"
          onClick={handleTitleClicked}
        >
          <h1 
            className={cn("flex flex-row text-wrap break-words justify-start w-full break-all font-light ", {
              'line-through text-primary/50': task?.checked,
              'group-hover:': !task?.checked
            })}
          >
            {task.label}
          </h1>
          <Pencil 
            width={14} 
            className="
              text-transparent group-hover/label:text-muted-foreground 
              cursor-pointer transition-all"
          />
        </div>
      }
    </div>
  )
}
