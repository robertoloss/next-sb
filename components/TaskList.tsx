import { useTransition } from "react";
import TaskCard from "./TaskCard";
import { Task } from "./FormComponent";
import AddTask from "./AddTask";
import { closestCenter, DndContext, DragEndEvent, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";

export type UpdateOptimisitTasks = (action: {
  action: "create" | "delete" | "updatePositions" | "changeState";
  id?: string;
  label?: string;
  newPositions?: Task[]
}) => void 

type Props = {
  updateTasksOrder: ({ newList }: { newList: any[] }) => Promise<void>
  createTaskAction: ({ id, label }: { id: string; label: string }) => Promise<void>,
  updateOptimisticTasks: UpdateOptimisitTasks,
  optimisticTasks: Task[]
  projectId: string
}

export default function TaskList({
  optimisticTasks,
  updateOptimisticTasks,
  createTaskAction,
  updateTasksOrder,
  projectId
}: Props) 
{
  const [_, startTransition ] = useTransition()

  async function manageEnd(e: DragEndEvent) {
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
      onDragStart={()=>{}}
      onDragEnd={manageEnd}
    >
      <div className="flex flex-col gap-y-4">
        <AddTask 
          updateOptimisticTasks={updateOptimisticTasks}
          createTaskAction={createTaskAction}
          projectId={projectId}
        />
        <div className="flex flex-col gap-y-4">
          <SortableContext
            items={optimisticTasks}
            strategy={verticalListSortingStrategy}
          >
          {
            optimisticTasks.map(task => (
              <TaskCard 
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
    </DndContext>
  )
}
