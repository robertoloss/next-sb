import { useState, useTransition } from "react"
import { v4 as uuid } from "uuid"
import { UpdateOptimisticProjects } from "./ProjectList"
import { Project } from "./ProjectCard"

type Args = {
  name: string
  id: string
}
type Props = {
  createProject: ({ name, id }: Args) => Promise<void>
  updateOptimisticProjects: UpdateOptimisticProjects 
}
export default function AddProject({ createProject, updateOptimisticProjects } : Props) {
  const [ eventValue, setEventValue ] = useState('')
  const [ _, startTransition ] = useTransition()

  function addProject(data: FormData) {
    const projectId = uuid()
    const projectName = data.get("project-name") as string 
    const newProject: Project = {
      name: projectName,
      id: projectId,
      created_at: new Date().toISOString(),
      position: 0,
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
  }

  return (
    <form 
      className="flex flex-row gap-4"
      onSubmit={()=>setEventValue('')}
      action={addProject}
    >
      <button 
        type="submit"
        className="w-40 h-10 bg-gray-700 hover:bg-gray-600"
      >
        Create!
      </button>
      <input 
        type="text" 
        name="project-name"
        onChange={(e)=>(setEventValue(e.target.value))}
        value={eventValue}
        className="bg-gray-900 w-full"
      />
    </form>
  )
}
