
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.43.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Get environment variables
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
  const supabaseServiceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseServiceRole)

  try {
    // Check if request has a body
    const body = await req.json()
    
    if (!body.user_id || !body.title || !body.message) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields. Please provide user_id, title, and message.' 
        }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          } 
        }
      )
    }

    // Prepare notification data
    const notificationData = {
      user_id: body.user_id,
      title: body.title,
      message: body.message,
      type: body.type || 'info',
      related_entity_type: body.related_entity_type || null,
      related_entity_id: body.related_entity_id || null,
      is_read: false,
    }

    // Insert notification into database
    console.log('Inserting notification:', notificationData)
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log('Notification created:', data)

    return new Response(
      JSON.stringify({ success: true, notification: data }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  } catch (error) {
    console.error('Error creating notification:', error)
    
    return new Response(
      JSON.stringify({ 
        error: `Failed to create notification: ${error.message}` 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        } 
      }
    )
  }
})
