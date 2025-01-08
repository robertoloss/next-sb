import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createTask } from "../actions/createTask";
import FormComponent from "@/components/FormComponent";
import updateTasksOrder from "../actions/updateTasksOrder";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: tasks } = await supabase
    .from("Task")
    .select()
    .order("position", { ascending: true });

  return (
    <FormComponent
      updateTasksOrderAction={updateTasksOrder}
      createTaskAction={createTask}
      tasks={tasks || []}
    />
  )
}

