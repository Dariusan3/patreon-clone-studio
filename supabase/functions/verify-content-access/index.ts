import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    const { postId } = await req.json()

    if (!postId) {
      return new Response(
        JSON.stringify({ error: 'Missing postId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch post details
    const { data: post, error: postError } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single()

    if (postError) {
      console.error('Post fetch error:', postError)
      return new Response(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if content is locked
    if (!post.is_locked) {
      return new Response(
        JSON.stringify({ 
          hasAccess: true, 
          reason: 'public',
          post: post 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check authentication for locked content
    if (userError || !user) {
      return new Response(
        JSON.stringify({ 
          hasAccess: false, 
          reason: 'authentication_required',
          requiredTier: post.required_tier 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Owner always has access
    if (post.user_id === user.id) {
      return new Response(
        JSON.stringify({ 
          hasAccess: true, 
          reason: 'owner',
          post: post 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Logic placeholder: Check membership tier
    // TODO: Implement actual membership tier verification
    // const { data: membership } = await supabaseClient
    //   .from('user_memberships')
    //   .select('tier')
    //   .eq('user_id', user.id)
    //   .single()
    
    // For now, deny access if locked (placeholder)
    const hasAccess = false // Replace with actual tier check
    
    console.log(`Access check for user ${user.id} to post ${postId}: ${hasAccess}`)

    return new Response(
      JSON.stringify({ 
        hasAccess: hasAccess,
        reason: hasAccess ? 'membership_valid' : 'insufficient_tier',
        requiredTier: post.required_tier,
        post: hasAccess ? post : null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in verify-content-access:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})