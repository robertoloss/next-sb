'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export default async function deleteProject({ id }: { id: string }) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('Project')
    .delete()
    .eq('id', id)

  if (error) console.error(error)
  console.error(`Project with id ${id} successfully deleted`)
  revalidatePath('/home')
}
