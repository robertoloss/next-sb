"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createExpense = async (
  { id, 
    amount 
  }: { 
    id: string,
    amount: number,
}) => {
  const supabase = await createClient();

  console.log("creating expense")
  const { error } = await supabase
    .from("Expense")
    .insert([{ amount, id }]);

  if (error) {
    console.error("Failed to create expense:", error.message);
  } else {
    console.log("Expense created successfully!");
    revalidatePath('/protected')
  }
};
