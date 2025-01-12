import { useState, useTransition } from "react";
import TaskCard from "./TaskCard";
import { Task } from "./FormComponent";
import AddTask from "./AddTask";
import { closestCenter, DndContext, DragEndEvent, DragOverlay, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Project } from "./ProjectCard";

export type UpdateOptimisitTasks = (action: {
  action: "create" | "delete" | "updatePositions" | "changeState";
  id?: string;
  label?: string;
  newPositions?: Task[]
}) => void 

type Props = {
  updateTasksOrder: ({ newList }: { newList: any[] }) => Promise<void>
  createTaskAction: ({ id, label, projectId }: { id: string; label: string, projectId: string }) => Promise<void>,
  updateOptimisticTasks: UpdateOptimisitTasks,
  optimisticTasks: Task[]
  projectId: string
  project: Project | null
}

export default function TaskList({
  optimisticTasks,
  updateOptimisticTasks,
  createTaskAction,
  updateTasksOrder,
  projectId,
  project
}: Props) 
{
  const [_, startTransition ] = useTransition()
  const [ activeTaskId, setActiveTaskId ] = useState<string | null>(null)

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
  );

  return (
    <DndContext
      modifiers={[
        restrictToVerticalAxis,
        restrictToParentElement
      ]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event)=>{ setActiveTaskId(event.active.id as string) }}
      onDragEnd={manageEnd}
    >
      <div className="flex flex-col gap-y-4 w-full max-w-[640px] h-full pb-[120px]">
        <h1 className="">
          {project ? project.name : ''}
        </h1>
        <AddTask 
          updateOptimisticTasks={updateOptimisticTasks}
          createTaskAction={createTaskAction}
          projectId={projectId}
        />
        <div className="tasklist flex flex-col gap-y-4 h-full overflow-auto pb-5 px-4">
          <SortableContext
            items={optimisticTasks}
            strategy={verticalListSortingStrategy}
          >
          {
            optimisticTasks.map(task => (
              <TaskCard 
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
          <TaskCard 
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
