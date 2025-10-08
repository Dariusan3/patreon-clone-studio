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

    // Verify user authentication
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      console.error('Authentication error:', userError)
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { postId, filePath } = await req.json()

    if (!postId || !filePath) {
      return new Response(
        JSON.stringify({ error: 'Missing postId or filePath' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify post access - check if post is locked and user has access
    const { data: post, error: postError } = await supabaseClient
      .from('posts')
      .select('is_locked, required_tier, user_id')
      .eq('id', postId)
      .single()

    if (postError) {
      console.error('Post fetch error:', postError)
      return new Response(
        JSON.stringify({ error: 'Post not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Logic placeholder: Check membership tier access
    // In production, verify user's membership tier against required_tier
    const hasAccess = !post.is_locked || post.user_id === user.id
    // TODO: Implement membership tier verification
    // const userTier = await getUserMembershipTier(user.id)
    // const hasAccess = !post.is_locked || userTier >= post.required_tier

    if (!hasAccess) {
      console.log(`Access denied for user ${user.id} to post ${postId}`)
      return new Response(
        JSON.stringify({ error: 'Insufficient membership tier' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate signed URL with 1 hour expiration
    const { data: signedData, error: signError } = await supabaseClient
      .storage
      .from('post-content')
      .createSignedUrl(filePath, 3600)

    if (signError) {
      console.error('Signed URL generation error:', signError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate signed URL' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Generated signed URL for user ${user.id}, post ${postId}`)

    return new Response(
      JSON.stringify({ signedUrl: signedData.signedUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in generate-signed-url:', error)
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})