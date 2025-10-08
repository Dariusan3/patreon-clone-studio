import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

interface ContentAccessResponse {
  hasAccess: boolean
  reason: string
  requiredTier?: string
  post?: any
}

export const useContentProtection = (postId: string | null) => {
  const [accessStatus, setAccessStatus] = useState<ContentAccessResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!postId) return

    const verifyAccess = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data, error: invokeError } = await supabase.functions.invoke(
          'verify-content-access',
          {
            body: { postId },
          }
        )

        if (invokeError) {
          throw invokeError
        }

        setAccessStatus(data)
      } catch (err: any) {
        console.error('Content access verification error:', err)
        setError(err.message || 'Failed to verify content access')
        setAccessStatus({
          hasAccess: false,
          reason: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    verifyAccess()
  }, [postId])

  return { accessStatus, loading, error }
}

export const useSignedUrl = () => {
  const [loading, setLoading] = useState(false)

  const getSignedUrl = async (postId: string, filePath: string): Promise<string | null> => {
    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke(
        'generate-signed-url',
        {
          body: { postId, filePath },
        }
      )

      if (error) {
        throw error
      }

      return data.signedUrl
    } catch (err: any) {
      console.error('Signed URL generation error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getSignedUrl, loading }
}