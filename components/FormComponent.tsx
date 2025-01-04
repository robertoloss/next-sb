'use client'

import { v4 as uuid } from "uuid"
import { cn } from "@/lib/utils"
import { useOptimistic, useState, useTransition } from "react"
import ExpenseCard from "./ExpenseCard"

type Props = {
  createExpenseAction: ({ id }: { id: string; }) => Promise<void>
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
  console.log("form rendered")

  return (
     <div className="flex flex-col gap-y-4">
      <form action={() => {
          const id = uuid()
          startTransition(() => updateOptimisticExpenses({ 
            action: "create",
            amount: 100,
            id
          }))
          createExpenseAction({ id })
        }}
      >
        <button 
          type="submit"
          className="w-40 h-10 bg-gray-700 hover:bg-gray-600"
        >
          Create!
        </button>
      </form>
      <div className="flex flex-col gap-y-4">
        {optimisticExpenses.map(expense => (
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
