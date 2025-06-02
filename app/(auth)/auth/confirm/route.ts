import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  console.log('🔍 === AUTH CONFIRM DEBUG ===')
  console.log('Full URL:', request.url)
  //console.log('Headers:', Object.fromEntries(request.headers.entries()))

  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  console.log('📋 Parameters:', { 
    token_hash: token_hash ? 'present' : 'missing', 
    type, 
    code: code ? 'present' : 'missing',
    next 
  })

  const supabase = await createClient()
  if (code) {
    console.log('✅ Code present, attempting verification with exchangeCodeForSession')
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    /*
    console.log('🔐 Code verification result:', { 
      success: !error, 
      error: error?.message,
      user: data.user?.email 
    })
    */
    if (!error) {
      console.log('🎉 Success! Redirecting to:', next)
      redirect(next)
    } else {
      console.log('❌ Code verification failed:', error.message)
    }
  }

  else if (token_hash && type) {
    console.log('✅ Token and type present, attempting verification')
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    /*
    console.log('🔐 Verification result:', { 
      success: !error, 
      error: error?.message,
      user: data.user?.email 
    })
      */

    if (!error) {
      // redirect user to specified redirect URL or root of app
      console.log('🎉 Success! Redirecting to:', next)
      redirect(next)
    } else {
      console.log('❌ Verification failed:', error.message)
    }
  }
  console.log('🔄 Redirecting to login with error')
  // redirect the user to an error page with some instructions
  redirect('/error')
}