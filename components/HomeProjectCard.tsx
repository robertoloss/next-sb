'use client'
import { Project } from "@/utils/supabase/types"
import { useRouter } from "next/navigation"

type Props = {
	project: Project
}
export default function HomeProjectCard({ project } : Props) {
	const router = useRouter()

	async function navigateToProject() {
		router.push(`/home/${project.id}`)
	}
	
	return (
		<div 
			className={`active:shadow-none dark:active:shadow-none
				flex flex-col flex-grow w-full  h-fit sm:h-full sm:min-h-[200px] sm:max-h-[200px] sm:max-w-[200px] rounded-lg 
				bg-sidebar-background border border-muted-foreground p-6 justify-between
				dark:hover:shadow-[-4px_4px_white] transition hover:shadow-[-4px_4px_black]
				hover:translate-x-1 hover:-translate-y-1 cursor-pointer hover:border-foreground
         active:translate-y-0  active:translate-x-0 
      `}
			onMouseUp={() => navigateToProject()}
		>
			<h1 className="font-semibold text-lg">
				{project.name}
			</h1>
			<div className="flex flex-col w-fit self-end text-sm font-light">
				<h1>
				</h1>
				<h1>
					Tasks: 10 
				</h1>
			</div>
		</div>
	)
}
				//active:shadow-none active:translate-x-0 active:translate-y-0"
