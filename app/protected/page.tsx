import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createExpense } from "../actions/createExpense";
import FormComponent from "@/components/FormComponent";


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
    .order("created_at", { ascending: false});

  return (
    <FormComponent
      createExpenseAction={createExpense}
      expenses={expenses || []}
    />
  )
}

