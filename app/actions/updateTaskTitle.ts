'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateTaskTitle(data: { id: string, newLabel: string}) {
  const { id, newLabel } = data;

  const supabase = await createClient()

  const { data: newTask, error } = await supabase
    .from('Task')
    .update({
      label: newLabel
    })
    .eq('id',id)
    .select()

  if (error) console.error(error)

  revalidatePath('/home')
  return { res: newTask, error }
}
