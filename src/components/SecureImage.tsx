import { useState, useEffect } from 'react'
import { useSignedUrl } from '@/hooks/useContentProtection'
import { Skeleton } from '@/components/ui/skeleton'
import { Lock, AlertCircle } from 'lucide-react'

interface SecureImageProps {
  postId: string
  filePath: string
  alt: string
  className?: string
  isLocked?: boolean
  showLockOverlay?: boolean
}

export const SecureImage = ({
  postId,
  filePath,
  alt,
  className = '',
  isLocked = false,
  showLockOverlay = true,
}: SecureImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const { getSignedUrl, loading } = useSignedUrl()

  useEffect(() => {
    const loadImage = async () => {
      if (!filePath) return

      try {
        const signedUrl = await getSignedUrl(postId, filePath)
        if (signedUrl) {
          setImageUrl(signedUrl)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error loading secure image:', err)
        setError(true)
      }
    }

    loadImage()
  }, [postId, filePath])

  if (loading) {
    return <Skeleton className={`w-full h-64 ${className}`} />
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center p-8">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Failed to load image</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={alt}
          className={`w-full h-full object-cover ${isLocked && showLockOverlay ? 'blur-md' : ''}`}
        />
      )}
      {isLocked && showLockOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Members Only</p>
          </div>
        </div>
      )}
    </div>
  )
}