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
  const { data: userTasks } = await supabase
    .from("Task")
    .select("*, project(*)")
    .eq('project.user', user.id)
    .order("position", { ascending: true });

  const { data: projects } = await supabase
    .from('Project')
    .select('*')
  

  userTasks?.forEach(task => console.log(task.project?.id))
    
  const tasks = userTasks?.filter(task => task.project?.id === projectId)
  const projectArray = projects?.filter(project => project.id == projectId)
  const project = projectArray && projectArray.length > 0 ? projectArray[0] : null

  console.log("tasks", tasks)



  return (      
    <div className="flex flex-row justify-center w-full h-full p-4 pt-10">
      <FormComponent
        updateTasksOrderAction={updateTasksOrder}
        createTaskAction={createTask}
        tasks={tasks || []}
        projectId={projectId}
        project={project || null}
      />
    </div>
  )
}
