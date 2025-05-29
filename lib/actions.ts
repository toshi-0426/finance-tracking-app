'use server'

import { Inputs, TransactionSchema } from "./validation"
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { RangeType } from "./consts";


export async function createTransaction(formData: Inputs) {
    const validated = TransactionSchema.safeParse(formData);

    if (!validated.success) {
        throw new Error('Invalid data form')
    }
    
    console.log(validated);
    const supabase = await createClient();
    const { error } = await supabase.from('transactions').insert(validated.data);

    if (error) {
        throw new Error('Failed creating the transaction');
    }
    revalidatePath('/dashboard');
}


export async function fetchTransactions(
  range: RangeType, offset: number = 0, limit: number = 10
){
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .rpc('fetch_transactions', {
      offset_arg: offset,
      limit_arg: limit,
      range_arg: range,
    })

  if (error) {
    throw new Error('Error: loading transactions')
  }
  return transactions;
}

