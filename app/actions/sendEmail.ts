'use server'
import { createClient } from '@/utils/supabase/server';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';


export default async function sendEmail() {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api', 
    key: process.env.MAILGUN_API_KEY || '' 
  });
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()  

  if (error) {
    console.error(error)
    return
  }
  
  mg.messages.create('sandboxc6d8039f5b4f42138be0ff95be0dc2a5.mailgun.org', {
    from: "QwikTasks <no-repy@gmail.com>",
    to: ["robertoloss@gmail.com"],
    subject: "New User for QwikTasks!",
    text: `A new user has signed-up for QwikTasks! Their email is ${user?.email}`,
    html: `<p>A new user has signed-up for QwikTasks! Their email is ${user?.email}</p>`
  })
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.error(err)); // logs any error
}
