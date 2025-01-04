import deleteExpense from "@/app/actions/deleteExpense"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"


type Props = {
  expense: any
  updateOptimisticExpenses: (action: {
    action: "create" | "delete";
    id?: string;
    amount?: number;
  }) => void
}
export default function ExpenseCard({ expense, updateOptimisticExpenses }: Props) {
  const [ green, setGreen ] = useState(false)
  const [ isLoading, startTransition ] = useTransition()
  return (
    <div
      className={cn("w-[400px] flex flex-row justify-between p-4 rounded-lg bg-blue-700", {
        'bg-green-400': green
      })}
    >
      <button
        className={cn("text-red-400 hover:bg-gray-800", {
        })}
        onClick={() => {
          startTransition(() => updateOptimisticExpenses({
            action: "delete",
            id: expense.id
          }))
          deleteExpense({ id: expense.id })}
        }
      >
        X
      </button>
      <div 
        className="flex flex-row justify-center w-full cursor-pointer hover:opacity-60"
        onClick={()=>setGreen(prev => !prev)}
      >
        {expense.amount}
      </div>
    </div>
  )
}
