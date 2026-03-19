import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { defaultLocale } from '@/lib/i18n'

export default function RootRedirect() {
  const router = useRouter()

  useEffect(() => {
    // 重定向到默认语言
    router.replace(`/${defaultLocale}/`)
  }, [router])

  return null
}
