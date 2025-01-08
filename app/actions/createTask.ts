"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const createTask = async ({ 
  id, 
  label 
}: { 
  id: string,
  label: string,
}) => {
  const supabase = await createClient();
  const { data: tasks, error: fetchError } = await supabase
    .from("Task")
    .select("id, position");

  if (fetchError) {
    console.error("Error fetching tasks:", fetchError.message);
    return;
  }

  if (tasks && tasks.length > 0) {
    const updatePromises = tasks.map(task =>
      supabase
        .from("Task")
        .update({ position: task.position! + 1 })
        .eq("id", task.id)
    );
    await Promise.all(updatePromises);
    console.log("Task positions updated successfully!");
  }

  console.log("creating task: ", id, label)
  const { error } = await supabase
    .from("Task")
    .insert([{ 
      label, 
      id,
      position: 0
    }]);

  if (error) {
    console.error("Failed to create task:", error.message);
  } else {
    console.log("Task created successfully!");
    revalidatePath('/protected')
  }
};
