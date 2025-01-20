import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Project } from "@/utils/supabase/types"
import { useRouter } from "next/navigation"
import { cn } from "./lib/utils"

type Args = {
  id: string
}
type Props = {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  project: Project | null
  deleteProject: ({ id }: Args) => Promise<void>
}
export function DeleteProjectModal({ 
  openModal, 
  deleteProject, 
  setOpenModal, 
  project, 
}
  : Props
) {
  const [ value, setValue ] = useState('')
  const [ showInput, setShowInput ] = useState(false)
  const [ error, setError ] = useState(false)
  const router = useRouter()

  const projectName = project?.name || "delete"

  function deleteProjectHandler() {
    if (value !== projectName) {
      setError(true)
      return
    }
    setOpenModal(false)
    deleteProject({
      id: project?.id || ''
    })
    router.push('/home')
  }

  return (
    <Dialog 
      onOpenChange={(bool) => { 
        setOpenModal(bool)
        setShowInput(false)
      }} 
      open={openModal}
    >
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="rounded-md max-w-[92%] pt-10 bg-sidebar-background flex flex-col justify-between sm:max-w-[425px] min-h-52">
       {!showInput &&
          <>
            <DialogHeader>
              <DialogTitle
                className="text-red-500 font-light"
              >
                Do you want to delete this project?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-end gap-x-4">
              <CancelButton setOpenModal={setOpenModal}/>
              <Button 
                className="bg-foreground dark:bg-destructive-foreground max-w-[80px] self-end w-full"
                type="button"
                onClick={()=>setShowInput(true)}
              >
                Yes
              </Button>
            </DialogFooter>
          </>
        }
        {showInput && 
          <div className="flex flex-col gap-y-10">
            <DialogHeader className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-2">
                <DialogTitle className="text-red-500 font-light">
                  Please enter the following text below:
                </DialogTitle>
                <DialogDescription>
                  {projectName.slice(0,20)}
                </DialogDescription>
              </div>
              <input 
                className={cn(" dark:bg-zinc-800 px-4 font-light rounded-md h-10 w-full border-2 dark:border-zinc-800", {
                  'dark:border-destructive border-destructive': error
                })}
                type="text"
                maxLength={20}
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                onFocus={()=>setError(false)}
              />
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-end gap-x-4">
              <CancelButton 
                setOpenModal={setOpenModal}
                setShowInput={setShowInput}
              />
              <Button 
                className="bg-red-500 hover:bg-red-400 transition-all"
                type="button"
                onClick={deleteProjectHandler}
              >
                Delete
              </Button>
            </DialogFooter>
          </div>
        }
      </DialogContent>
    </Dialog>
  )
}

type CancelProps = {
  setOpenModal: Dispatch<SetStateAction<boolean>>
  setShowInput?: Dispatch<SetStateAction<boolean>>
}
function CancelButton({ setOpenModal, setShowInput }: CancelProps) {
  function clickHandler() {
    if (setShowInput) setShowInput(false)
    setOpenModal(false)
  }
  return (
    <Button 
      className="border-foreground dark:border-destructive-foreground bg-background border font-light text-foreground max-w-[80px] w-full hover:bg-foreground/10"
      type="button"
      onClick={clickHandler}
    >
      Cancel
    </Button>
  )
}

