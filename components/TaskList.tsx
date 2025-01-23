import { useEffect, useState, useTransition } from "react";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { closestCenter, DndContext, DragEndEvent, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Project, Task } from "@/utils/supabase/types";
import { useAppStore } from "@/utils/zustand/store";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { ProjectDropDownMenu } from "./ProjectDropDownMenu";
import { EllipsisVertical } from "lucide-react";
import { DeleteProjectModal } from "./DeleteProjectModal";
import ProjectTitle from "./ProjectTitle";
import TaskCardWrapper from "./TaskCardWrapper";

export type UpdateOptimisitTasks = (action: {
  action: "create" | "delete" | "updatePositions" | "changeState";
  id?: string;
  label?: string;
  newPositions?: Task[]
}) => void 

type Props = {
  deleteProject: ({ id }: { id: string }) => Promise<void>
  updateTasksOrder: ({ newList }: { newList: any[] }) => Promise<void>
  createTaskAction: ({ id, label, projectId }: { id: string; label: string, projectId: string }) => Promise<void>
  updateOptimisticTasks: UpdateOptimisitTasks
  optimisticTasks: Task[]
  projectId: string
  project: Project | null
  updateOptimisticProject: (action: {
    action: "update";
    newProject: Project;
  }) => void
}

export default function TaskList({
  deleteProject,
  optimisticTasks,
  updateOptimisticTasks,
  createTaskAction,
  updateTasksOrder,
  projectId,
  project,
  updateOptimisticProject
}
  : Props) 
{
  const [ activeTaskId, setActiveTaskId ] = useState<string | null>(null)
  const [ openModal, setOpenModal ] = useState(false)

  const [_, startTransition ] = useTransition()
  const { showSkeletonList, setShowSkeletonList } = useAppStore()

  useEffect(()=>{
    setShowSkeletonList(false)
  },[])


  async function manageEnd(e: DragEndEvent) {
    setActiveTaskId(null)
    //console.log(e)
    const { active, over } = e;

    if (active.id !== over?.id) {
      const oldIndex = optimisticTasks.findIndex((task) => task.id === active.id);
      const newIndex = optimisticTasks.findIndex((task) => task.id === over?.id);

      const newOrder = arrayMove(optimisticTasks, oldIndex, newIndex);
      const newPositions = newOrder.map((task, i) => ({ ...task, position: i}))
      startTransition(() => updateOptimisticTasks({
        action: "updatePositions",
        newPositions
      }))
      updateTasksOrder({ newList: newPositions})
    }
  }
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
  );

  if (showSkeletonList) return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex flex-col w-full max-w-[640px]  gap-y-4">
        {[...Array(8).keys()].map((item) => (
          <Skeleton 
            key={item}
            className="w-full h-10 rounded-md min-h-[60px]"
          />
        ))}
      </div>
    </div>
  ) 


  return (
    <DndContext
      id={projectId}
      modifiers={[
        restrictToVerticalAxis,
        restrictToParentElement
      ]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event)=>{ setActiveTaskId(event.active.id as string) }}
      onDragEnd={manageEnd}
    >
      <div className="flex z-10 flex-col gap-y-4 w-full max-w-[640px] h-full pb-10">
        <div className="flex flex-col w-full px-4 gap-y-4">
          <div className="flex flex-row w-full items-center justify-between">
            <ProjectTitle
              project={project}
              updateOptimisticProject={updateOptimisticProject}
            />
            <DeleteProjectModal 
              openModal={openModal} 
              setOpenModal={setOpenModal}
              project={project}
              deleteProject={deleteProject}
            />
            <ProjectDropDownMenu setOpenModal={setOpenModal}>
              <EllipsisVertical 
                width={20} 
                className="cursor-pointer"
              />
            </ProjectDropDownMenu>
            {false && <Switch className="dark:data-[state=unchecked]:bg-zinc-700"/>}
          </div>
          <AddTask 
            updateOptimisticTasks={updateOptimisticTasks}
            createTaskAction={createTaskAction}
            projectId={projectId}
          />
        </div>
        <div className="tasklist flex flex-col gap-y-4 h-full overflow-auto pb-5 px-4">
          <SortableContext
            items={optimisticTasks}
            strategy={verticalListSortingStrategy}
          >
          {
            optimisticTasks.map(task => (
              <TaskCardWrapper 
                projectId={projectId}
                overlay={false}
                updateOptimisticTasks={updateOptimisticTasks}
                task={task}
                key={task.id}
                id={task.id}
              />
            ))
          }
          </SortableContext>
        </div>
      </div>
      {activeTaskId &&
        <DragOverlay>
          <TaskCardWrapper
            projectId={projectId}
            overlay={true}
            updateOptimisticTasks={updateOptimisticTasks}
            task={optimisticTasks.find(task => task.id === activeTaskId!)!}
            key={optimisticTasks.find(task => task.id === activeTaskId!)!.id}
            id={optimisticTasks.find(task => task.id === activeTaskId!)!.id}
          />
        </DragOverlay>
      }
    </DndContext>
  )
}
