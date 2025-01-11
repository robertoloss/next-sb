import createProject from "@/app/actions/createProject";
import { createClient } from "@/utils/supabase/server";
import ProjectList from "@/components/ProjectList";

export default async function SideBar() {
  const supabase = await createClient()

  const { data: { user } } = await supabase
    .auth
    .getUser()

  const { data: projects} = await supabase
    .from('Project')
    .select("*")
    .eq('user', user?.id || '')
    .order('position', { ascending: true })
    

  return (
    <div className="flex flex-col gap-y-4 p-4 bg-gray-700 w-full max-w-[320px]">
      <ProjectList
        projects={projects || []}
        createProjectAction={createProject}
      />
    </div>
  )
}
