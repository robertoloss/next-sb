'use client'

import { v4 as uuid } from "uuid"
import { RefObject, useOptimistic, useTransition } from "react"
import ExpenseCard from "./ExpenseCard"
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

type Props = {
  createExpenseAction: ({ id, amount }: { id: string; amount: number }) => Promise<void>
  expenses: any[]
}
export default function FormComponent({ createExpenseAction, expenses }: Props) {
  const [ _, startTransition ] = useTransition()
  const [ optimisticExpenses, updateOptimisticExpenses ] = useOptimistic(
    expenses,
    (state, { action, id, amount } : {
      action: "create" | "delete",
      id?: string,
      amount?: number
    }) => {
      switch (action) {
        case "create":
          const dummyExpense = { 
            id, 
            amount,
            dummy: true
          }
          return [ dummyExpense, ...state ]
        case "delete":
          return state.filter(e => e.id !== id)
      }
    }
  )
  const [parentRef, values, setValues] = useDragAndDrop(
    optimisticExpenses
  )
  

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
