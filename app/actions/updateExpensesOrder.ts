'use server'
import { createClient } from "@/utils/supabase/server";

export default async function updateExpensesOrder({ newList }: { newList: any[]}) {
  const supabase = await createClient()

  try {
    const updatePromises = newList.map(task => 
      supabase
        .from("Expense")
        .update({ position: task.position})
        .eq('id', task.id)
    )

    await Promise.all(updatePromises)
  } catch(error) {
    console.error(error)
  }
}
