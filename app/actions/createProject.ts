'use server'
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export default async function createProject({ name, id }: { name: string, id: string}) {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error(userError)
    return
  }

  const { error, data } = await supabase
    .from('Project')
    .insert([
      {
        id,
        name,
        user: user.id,
        position: 0
      }
    ])
    .select()

  if (error) {
    console.error(error)
    return
  }
  console.log(`New project created: `, data.forEach(p => console.log(p)))
  revalidatePath('/home/@sidebar')
}
