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

  if (dataError) return


  return (
    <div className="flex z-10 flex-col w-full h-full">
      <div className="flex flex-row p-5 flex-wrap w-full h-fit gap-4 sm:gap-6 overflow-auto tasklist">
        {projects
          .sort((a,b) => a.position! - b.position!)
          .map(project => (
          <HomeProjectCard 
            key={project.id}
            project={project}
          />
        ))}
      </div>
      <GeometricPattern/>
    </div>
  )
}

