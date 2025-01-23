'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateProjectTitle(data: { id: string, title: string}) {
  const { id, title } = data;

  console.log(`updating project ${id} with new title ${title}`)

  const supabase = await createClient()

  const { data: res , error } = await supabase
    .from('Project')
    .update({
      name: title
    })
    .eq('id', id)
    .select()

  if (error) {
    console.error(error)
  }
  revalidatePath('/home')
  return { res, error }
}
