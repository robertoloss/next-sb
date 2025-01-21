'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export default async function deleteTask({ 
  id, 
  position, 
  projectId 
} : { 
  id: string, 
  position: number,
  projectId: string
}) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from("Task")
    .delete()
    .eq('id', id)

  if (error) {
    console.log("An error occurred while deleting task", id, error)
    return
  } 
  console.log(`Task ${id} was successfully deleted`)

  const { data, error: errorFetch } = await supabase
    .from("Task")
    .select()
    .eq('project', projectId)
    .gt('position', position)

  if (errorFetch || !data ) {
    console.error(`An error occurred while fetching the tasks with position greater than ${position} (i.e the position of the deleted task ${id})`)
    return
  }

  const updatePromises = data.map(task => supabase
    .from('Task')
    .update({ position: task.position! -1 })
    .eq('id', task.id)
  )

  await Promise.all(updatePromises)

  revalidatePath("/home", "layout")
}
