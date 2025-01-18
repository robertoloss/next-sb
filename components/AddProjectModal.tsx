import { Button } from "@/components/ui/button"
import { v4 as uuid } from "uuid"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UpdateOptimisticProjects } from "./ProjectList"
import { useState, useTransition } from "react"
import { Project } from "./ProjectCard"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/utils/zustand/store"

type Args = {
  name: string
  id: string
}
type Props = {
  createProject: ({ name, id }: Args) => Promise<void>
  updateOptimisticProjects: UpdateOptimisticProjects 
  children: React.ReactNode
  numberOfProjects: number
}
export function AddProjectModal({ createProject, updateOptimisticProjects, children, numberOfProjects }: Props) {
  const [ open, setOpen ] = useState(false)
  const [ eventValue, setEventValue ] = useState('')
  const [ _, startTransition ] = useTransition()
  const router = useRouter()
  const { setShowSkeletonList } = useAppStore()

  function addProject(data: FormData) {
    const projectId = uuid()
    const projectName = data.get("project-name") as string 
    const newProject: Project = {
      name: projectName,
      id: projectId,
      created_at: new Date().toISOString(),
      position: numberOfProjects,
      user: 'dummy'
    }
    startTransition(() => {
      updateOptimisticProjects({
        action: "create", 
        project: newProject
      })
    })
    createProject({
      name: projectName!,
      id: projectId
    })
    router.push(projectId)
  }

  function manageButtonClick() {
    setShowSkeletonList(true)
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={()=>setEventValue('')}
          action={addProject}
        >
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              Enter the name of your new project
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input 
                name="project-name" 
                onChange={(e)=>(setEventValue(e.target.value))}
                value={eventValue}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit"
              onClick={manageButtonClick}
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}



