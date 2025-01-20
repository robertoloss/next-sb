import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  children: React.ReactNode
  setOpenModal: Dispatch<SetStateAction<boolean>>
}
export function ProjectDropDownMenu({ children, setOpenModal }: Props) {
  const [ open, setOpen ] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        { children }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex w-fit min-w-[0px]">
        <DropdownMenuGroup className="flex w-fit">
            <DropdownMenuItem 
              onClick={()=>setOpenModal(true)}
              className="text-center focus:text-red-500 cursor-pointer"
            >
                Delete
            </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
