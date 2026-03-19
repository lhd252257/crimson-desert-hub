import Link from 'next/link'
import { useRouter } from 'next/router'
import { Locale, defaultLocale } from '@/lib/i18n'

export default function Custom404() {
  const router = useRouter()
  const locale = (router.locale || defaultLocale) as Locale

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-brand-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={`/${locale}/`}
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href={`/${locale}/news`}
            className="bg-brand-card border border-brand-border text-white px-6 py-3 rounded-lg font-semibold hover:border-brand-primary transition-colors"
          >
            Latest News
          </Link>
        </div>
      </div>
    </div>
  )
}
