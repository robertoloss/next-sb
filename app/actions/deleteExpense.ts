'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export default async function deleteExpense({ id } : { id: string }) {
  const supabase = await createClient()

  const { error } = await supabase
    .from("Expense")
    .delete()
    .eq('id', id)

  if (error) {
    console.log("en error occurred", error)
  } else {
    console.log(`expense with id ${id} was successfully deleted`)
    revalidatePath("/protected")
  }
}
