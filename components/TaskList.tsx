import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { RefObject, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Task } from "./FormComponent";
import AddTask from "./AddTask";
import { handleEnd } from "@formkit/drag-and-drop";

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
}

export default function TaskList({
  optimisticTasks,
  updateOptimisticTasks,
  createTaskAction,
  updateTasksOrder
}: Props) {
  const [parentRef, values, setValues] = useDragAndDrop<HTMLUListElement,Task>(
    optimisticTasks,
    {
      group: "tasks",
      handleEnd(data) {
        async function manageEnd() {
          const newTasks = values.map((val, i) => ({ ...val, position: i }))
          setValues(newTasks)
          await updateTasksOrder({ newList: newTasks})
					if (data.initialParent?.el) handleEnd(data)
        }
        manageEnd()
      },
      //dropZoneClass: "opacity-25",
    }
  )
  useEffect(()=>{
    console.log("useEffect TaskList")
    setValues(optimisticTasks)
  },[optimisticTasks])

  console.log("TaskList")

  return (
    <div className="flex flex-col gap-y-4">
      <AddTask 
        updateOptimisticTasks={updateOptimisticTasks}
        createTaskAction={createTaskAction}
      />
      <ul 
        className="flex flex-col gap-y-4"
        ref={parentRef} 
      >
        {values.map(task => (
          <TaskCard 
            updateOptimisticTasks={updateOptimisticTasks}
            task={task}
            key={task.id}
          />
        ))}
      </ul>
    </div>
  )
}
