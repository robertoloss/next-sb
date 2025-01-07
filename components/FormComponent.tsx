'use client'
import { useOptimistic } from "react"
import ExpenseList from "./ExpenseList";

type Props = {
  updateExpensesOrderAction: ({ newList }: { newList: any[] }) => Promise<void>
  createExpenseAction: ({ id, amount }: { id: string; amount: number }) => Promise<void>
  expenses: any[]
}
export default function FormComponent({ createExpenseAction, expenses, updateExpensesOrderAction }: Props) {
  const [ optimisticExpenses, updateOptimisticExpenses ] = useOptimistic(
    expenses,
    (state, { action, id, amount, newPositions } : {
      action: "create" | "delete" | "updatePositions",
      id?: string,
      amount?: number,
      newPositions?: any[]
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
        case "updatePositions":
          return newPositions || state
      }
    }
  )
  return (
    <ExpenseList 
      createExpenseAction={createExpenseAction}
      optimisticExpenses={optimisticExpenses}
      updateExpensesOrder={updateExpensesOrderAction}
      updateOptimisticExpenses={updateOptimisticExpenses}
    />
  )
}
