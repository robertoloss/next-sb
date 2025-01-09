import { createTask } from "@/app/actions/createTask"
import updateTasksOrder from "@/app/actions/updateTasksOrder"
import FormComponent from "@/components/FormComponent"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ projectId: string }>
}
export default async function Main({ params } : Props) {
  const projectId = (await params).projectId;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: tasks } = await supabase
    .from("Task")
    .select()
    .eq('project', projectId)
    .order("position", { ascending: true });

  return (      
    <div className="flex flex-row justify-center w-full h-full p-4 pt-10">
      <FormComponent
        updateTasksOrderAction={updateTasksOrder}
        createTaskAction={createTask}
        tasks={tasks || []}
        projectId={projectId}
      />
    </div>
  )
}
