import { useAppStore } from "@/utils/zustand/store"
import { Task } from "./FormComponent"


type Props = {
  tasks: Task[] | null
}
export default function SetShowSkeletonWrapper({ tasks }: Props) {
  const { setShowSkeletonList } = useAppStore()
  if (tasks) setShowSkeletonList(false)

  return(<></>)
}
