import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function LoadingBar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  if (!loading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      <div className="h-1 bg-brand-primary animate-pulse">
        <div className="h-full bg-orange-400 animate-[loading_1s_ease-in-out_infinite]" />
      </div>
    </div>
  )
}
