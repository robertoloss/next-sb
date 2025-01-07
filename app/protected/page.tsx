import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createExpense } from "../actions/createExpense";
import FormComponent from "@/components/FormComponent";
import updateExpensesOrder from "../actions/updateExpensesOrder";


export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  const { data: expenses } = await supabase
    .from("Expense")
    .select()
    .order("position", { ascending: true });

  return (
    <FormComponent
      updateExpensesOrderAction={updateExpensesOrder}
      createExpenseAction={createExpense}
      expenses={expenses || []}
    />
  )
}

