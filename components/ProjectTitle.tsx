import updateProjectTitle from "@/app/actions/updateProjectTitle"
import { Project } from "@/utils/supabase/types"
import { useAppStore } from "@/utils/zustand/store"
import { Check, Pencil, X } from "lucide-react"
import { useEffect, useRef, useState, useTransition } from "react"

type Props = {
  project: Project | null,
  updateOptimisticProject: (action: {
    action: "update";
    newProject: Project;
  }) => void
}
export default function ProjectTitle({ project, updateOptimisticProject }: Props) {
  const { updateProjects } = useAppStore()
  const [ showTitleInput, setShowTitleInput ] = useState(false) 
  const initialInputValue = project ? project.name! : ''
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
    console.log("updating")
    const newName = data.get('newName') as string
    const newProject = { ...project!, name: newName }
    if (updateProjects) updateProjects({
      action: 'update',
      project: newProject
    })
    startTransition(()=> updateOptimisticProject({ 
      action: 'update',
      newProject
    }))
    const { res, error } = await updateProjectTitle({
      id: project?.id || '',
      title: newName,
    })
    console.log("data, error: ", res, error)
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
      onClick={handleTitleClicked}
    >
      {showTitleInput &&
        <form 
          onSubmit={()=>setShowTitleInput(false)}
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
