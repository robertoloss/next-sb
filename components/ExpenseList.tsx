import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { RefObject, useEffect, useTransition } from "react";
import { v4 as uuid } from "uuid"
import ExpenseCard from "./ExpenseCard";

type Props = {
  updateExpensesOrder: ({ newList }: { newList: any[] }) => Promise<void>
  createExpenseAction: ({ id, amount }: { id: string; amount: number }) => Promise<void>,
  updateOptimisticExpenses: (action: {
    action: "create" | "delete" | "updatePositions";
    id?: string;
    amount?: number;
    newPositions?: any[]
  }) => void,
  optimisticExpenses: any[]
}
export default function ExpenseList({
  optimisticExpenses,
  updateOptimisticExpenses,
  createExpenseAction,
  updateExpensesOrder
}: Props) {
  const [ _, startTransition ] = useTransition()

  const [parentRef, values, setValues] = useDragAndDrop(
    optimisticExpenses,
    {
      handleEnd() {
        console.log('\n')
        console.log(values.map(val => ({amount: val.amount, pos: val.position })))
        const newTasks = values
          .map((val, i) => ({ ...val, position: i }))
        console.log(newTasks.map(val => ({amount: val.amount, pos: val.position })))
        updateExpensesOrder({ newList: newTasks})
      },
    }
  )

  useEffect(()=>{
    setValues(optimisticExpenses)
  },[optimisticExpenses])


  return (
   <div className="flex flex-col gap-y-4">
    <form 
      className="flex flex-row gap-4"
      action={(data: FormData) => {
        const id = uuid()
        const amount = data.get('amount') as unknown as number
        startTransition(() => updateOptimisticExpenses({ 
          action: "create",
          amount,
          id
        }))
        createExpenseAction({ id, amount })
      }}
    >
      <button 
        type="submit"
        className="w-40 h-10 bg-gray-700 hover:bg-gray-600"
      >
        Create!
      </button>
      <input 
        type="number" 
        name="amount"
        className="bg-gray-900 w-full"
      />
    </form>
    <div 
      className="flex flex-col gap-y-4"
      ref={parentRef as RefObject<HTMLDivElement>}
    >
      {values.map(expense => (
        <ExpenseCard 
          updateOptimisticExpenses={updateOptimisticExpenses}
          expense={expense}
          key={expense.id}
        />
      ))}
    </div>
  </div>
  )
}
