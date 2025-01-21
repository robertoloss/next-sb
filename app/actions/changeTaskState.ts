'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

type Args = {
  id: string,
  newState: boolean
}
export default async function changeTaskState({ id, newState }: Args) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("Task")
    .update({ checked: newState })
    .eq('id', id)

  if (error) {
    console.error(error)
    return
  }
  revalidatePath('/home')
}
