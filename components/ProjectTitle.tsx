import { Project } from "@/utils/supabase/types"
import { Check, Pencil, X } from "lucide-react"
import { KeyboardEventHandler, useEffect, useRef, useState } from "react"



type Props = {
  project: Project | null,
  updateOptimisticProject: (action: {
    action: "update";
    newProject: Project;
  }) => void
}
export default function ProjectTitle({ project, updateOptimisticProject }: Props) {
  const [ showTitleInput, setShowTitleInput ] = useState(false) 
  const initialInputValue = project ? project.name! : ''
  const [ inputValue, setInputValue ] = useState(initialInputValue)

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

  function updateTitle(data: FormData) {
    const newName = data.get('newName') as string
    const newProject = { ...project!, name: newName }
    updateOptimisticProject({ 
      action: 'update',
      newProject
    })
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
      className="flex flex-row w-full max-w-[75%] gap-x-4 group cursor-pointer"
      onClick={handleTitleClicked}
    >
      {showTitleInput &&
        <form 
          action={updateTitle}
          className="flex flex-row items-center gap-x-4 h-[28px] w-full"
        >
          <input 
            name="newName" 
            ref={inputRef}
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            type='text'
            className="flex w-full bg-transparent flex-row border-none focus:outline-none text-xl font-light text-muted-foreground"
          />
          <div className="flex flex-row gap-x-1">
            <button>
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
        <>
          <h1 className="font-light text-xl group-hover:text-muted-foreground transition-all">
            {project ? project.name : ''}
          </h1>
          <Pencil width={12} className="invisible group-hover:visible place-self-end group-hover:text-muted-foreground cursor-pointer transition-all"/>
        </>
      }
    </div>
  )
}
