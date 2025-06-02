'use server'

import { Inputs, SettingsFormSchema, TransactionSchema } from "./validation"
import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";
import { FormState, RangeType } from "./consts";
import { redirect } from "next/navigation";


export async function createTransaction(formData: Inputs) {
    const validated = TransactionSchema.safeParse(formData);

    if (!validated.success) {
        throw new Error('Invalid data form')
    }
    
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

  if (!email || typeof email !== 'string'){
    return {
      error: true,
      message: 'Invalid email'
    }
  }

  const supabase = await createClient();
  const redirectURL = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm`
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: redirectURL//'http://localhost:3000/auth/confirm',
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

  const { error } = await supabase.storage 
        .from('avatars')
        .upload(filename, file);

  if (error) {
    return {
      error: true,
      message: 'Error Uploading avatar'
    };
  }

  // delete avatar
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError) {
    return {
      error: true,
      message: 'Something went wrong, try again'
    }
  }

  const avatar = userData.user.user_metadata.avatar

  if (avatar) {
    const { error } = await supabase.storage
                        .from('avatars')
                        .remove([avatar]);
    
    if (error) {
      return {
        error: true,
        message: 'Failed deleting the old avatar'
      }
    }
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

export async function updateSettings(
  prevState: FormState, 
  formData: FormData
){
  const username = formData.get('username');
  const defaultView = formData.get('defaultView');
  
  const validated = SettingsFormSchema.safeParse({
    username: username,
    defaultView: defaultView,
  })

  if (!validated.success){
    return {
      error: true,
      message: "Invalid username",
      errors: validated.error.flatten().fieldErrors
    }

  }
  const { username: validUsername, defaultView: validRange } = validated.data;

  const supabase = await createClient();

  const {data, error} = await supabase.auth.getUser();

  if (error) {
    return {
      error: true,
      message: "Something went wrong. Try again."
    }
  }

  const user_id = data.user.id;
  
  const { error: updateError } = await supabase
                      .from('profiles')
                      .update({ 
                        username: validUsername,
                        range: validRange,
                        updated_at: new Date().toISOString()
                      })
                      .eq('user_id', user_id);
  

  if (updateError) {
    return {
      error: true,
      message: 'Failed updating setting'
    }
  }


  return {
    error: false,
    message: "Updated user settings"
  }
}

export async function insertUserProfile(
  user_id: string, email: string
){

  const supabase = await createClient();
  const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('user_id', user_id)
                    .single();

  if (!data) {
    await supabase.from('profiles').insert({
      user_id: user_id,                             
      username: email.split('@')[0],
      range: 'last30days',
      updated_at: new Date().toISOString(),
    });
  } else {
    //console.log("User profile data is already in the profiles table")
  }
}

export async function getUserProfileRange(user_id: string){

  const supabase = await createClient();
  const { data, error } = await supabase.from('profiles')
                            .select('range')
                            .eq('user_id', user_id)
                            .single();

  if (error || !data) {
    throw new Error('No range data found');
  }

  return data.range;
}

export async function getUserProfileUsername(user_id: string){

  const supabase = await createClient();
  await new Promise(resolve => setTimeout(resolve, 1000));
  const { data, error } = await supabase.from('profiles')
                            .select('username')
                            .eq('user_id', user_id)
                            .single();

  if (error || !data) {
    throw new Error('No range data found');
  }

  return data.username;
}


export async function getUserProfile(user_id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('profiles')
                            .select('*')
                            .eq('user_id', user_id)
                            .single();

  if (error || !data) {
    throw new Error('No range data found');
  }

  return data;
}
