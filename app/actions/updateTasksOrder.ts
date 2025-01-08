'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function updateTasksOrder({ newList }: { newList: any[]}) {
  const supabase = await createClient()

  try {
    const updatePromises = newList.map(task => 
      supabase
        .from("Task")
        .update({ position: task.position})
        .eq('id', task.id)
    )
    const results = await Promise.all(updatePromises);

    const errors = results.filter(({ error }) => error);

    if (errors.length > 0) {
      console.error("Some tasks failed to update:", errors);
      return;
    }

    revalidatePath("/protected")

  } catch(error) {
    console.error(error)
  }
}
