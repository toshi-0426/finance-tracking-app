'use server'

import { Inputs, TransactionSchema } from "./validation"
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { FormState, RangeType } from "./consts";
import { redirect } from "next/navigation";


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



export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Could not delete the transaction: ${id}`);
  }
  revalidatePath("/dashboard");
}


export async function updateTransaction(id: string, formData: Inputs) { 
  const validated = TransactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const supabase = await createClient();
  const { error } = await supabase
      .from('transactions')
      .update(validated.data)
      .eq('id', id);

  if (error) {
    throw new Error('Failed updating the transaction');
  } 

  revalidatePath('/dashboard');
}


export async function login(
  prevState: FormState, 
  formData: FormData
){
  const email = formData.get('email');
  console.log(email);

  if (!email || typeof email !== 'string'){
    return {
      error: true,
      message: 'Invalid email'
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    }
  });

  if (error) {
    return {
      error: true,
      message: error.message || 'Error Authenticating'
    };
  };

  return {
    error: false,
    message: `Email sent to ${email}`
  };
}


export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sing-out Error', error);
    return;
  };

  redirect("/login");
}


export async function uploadAvatar(
  prevState: FormState, 
  formData: FormData
){
  const supabase = await createClient();
  const file = formData.get('file') as File;

  if (!file) {
    return {
      error: true,
      message: "No file uploaded"
    }
  }

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    return {
      error: true,
      message: "Only JPEG or PNG files are allowed"
    };
  }

  if (file.size > 512 * 1024) {
    return {
      error: true,
      message: "ile size must be less than 512 KB"
    };
  }

  const fileExtension = file.name.split('.').pop();
  const filename = `${Math.random()}.${fileExtension}`;
  //console.log("filename: ", filename);

  const { error } = await supabase.storage 
        .from('avatars')
        .upload(filename, file);

  if (error) {
    return {
      error: true,
      message: 'Error Uploading avatar'
    };
  }


  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: filename
    }
  })

  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user'
    };
  }

  return {
    error: false,
    message: 'Updated the user avatar'
  }
}