import { createTask } from "@/app/actions/createTask"
import deleteProject from "@/app/actions/deleteProject";
import updateTasksOrder from "@/app/actions/updateTasksOrder"
import FormComponent from "@/components/FormComponent"
import { GeometricPattern } from "@/components/GeometricPattern";
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
  
    
  const tasks = userTasks?.filter(task => task.project?.id === projectId)
  const projectArray = projects?.filter(project => project.id == projectId)
  const project = projectArray && projectArray.length > 0 ? projectArray[0] : null




  return (      
    <div className="flex flex-row h-full justify-center w-full pt-10">
      <GeometricPattern className="z-0" />
      <FormComponent
        deleteProjectAction={deleteProject}
        updateTasksOrderAction={updateTasksOrder}
        createTaskAction={createTask}
        tasks={tasks || []}
        projectId={projectId}
        project={project || null}
      />
    </div>
  )
}
