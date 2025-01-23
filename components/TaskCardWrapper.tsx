import { Task } from "@/utils/supabase/types";
import { useOptimistic } from "react";
import TaskCard from "./TaskCard";


type Props = {
  task: Task
  updateOptimisticTasks: (action: {
    action: "create" | "delete" | "changeState";
    id?: string;
    amount?: number;
  }) => void
  id: string
  overlay: boolean
  projectId: string
}
export default function TaskCardWrapper({ task, overlay, updateOptimisticTasks, id, projectId }: Props) {
  const [ optimisticTask, updateOptimisticTask ] = useOptimistic(
    task, 
    (_ , { action, newTask } : {
      action: 'update',
      newTask: Task
    }) => {
      switch (action) {
        case 'update':
          return newTask
      }
    }
  )

  return (
    <TaskCard
      projectId={projectId}
      overlay={overlay}
      updateOptimisticTasks={updateOptimisticTasks}
      updateOptimisticTask={updateOptimisticTask}
      task={optimisticTask}
      id={id}
    />
  )
}

