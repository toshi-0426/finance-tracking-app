'use server'

import { Inputs, TransactionSchema } from "./validation"
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";


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

