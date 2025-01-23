import { GeometricPattern } from "@/components/GeometricPattern";
import HomeProjectCard from "@/components/HomeProjectCard";
import { createClient } from "@/utils/supabase/server";


export default async function Page() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase
    .auth
    .getUser()

  if (!user || error) return

  const { data: projects, error: dataError } = await supabase
    .from('Project')
    .select('*')
    .eq('user', user.id)
    .order('created_at', { ascending: true })

  if (dataError) return

  const { data: tasks, error: tasksError } = await supabase
    .from('Task')
    .select('*')
    .in('project', projects.map(p => p.id))
  
  if (tasksError) return

  


  return (
    <div className="flex z-10 flex-col w-full h-full">
      <div className="flex flex-row p-5 flex-wrap w-full h-fit gap-4 sm:gap-6 overflow-auto tasklist">
        {projects
          .map(project => (
          <HomeProjectCard 
            key={project.id}
            project={project}
            numTasks={
              tasks.reduce((acc, cur) => {
                if (cur.project === project.id) {
                  return acc + 1
                } else return acc
              }, 0) || 0
            }
            numTasksChecked={
              tasks.reduce((acc,cur) => {
                if (cur.project === project.id && cur.checked) {
                  return acc + 1
                } else return acc
              }, 0) || 0
            }
          />
        ))}
      </div>
      <GeometricPattern/>
    </div>
  )
}

