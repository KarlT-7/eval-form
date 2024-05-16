
import AccountForm from './account/account-form'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Account() {
  const supabase = createClient()
  const user = await supabase.auth.getUser()

  if(!user.data.user){
    redirect('./login')
  } else {
    redirect('./myforms')
  }


}
