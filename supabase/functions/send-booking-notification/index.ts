
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, company, message } = await req.json()

    // Send notification email using your preferred email service
    // For now, we'll just console.log the details
    console.log(`New booking request from ${name} (${email})`)
    console.log(`Company: ${company}`)
    console.log(`Message: ${message}`)

    // Store in database
    const supabaseClient = createClient(
      'https://tqsdbluknhotwkpjuvvp.supabase.co',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { error } = await supabaseClient
      .from('call_bookings')
      .insert([{ name, email, company, message }])

    if (error) throw error

    return new Response(
      JSON.stringify({ message: 'Booking request received' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
