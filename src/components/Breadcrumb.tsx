import Link from 'next/link'
import { useRouter } from 'next/router'
import { Locale, t } from '@/lib/i18n'

interface BreadcrumbProps {
  locale: Locale
  items?: Array<{ label: string; href?: string }>
}

export default function Breadcrumb({ locale, items }: BreadcrumbProps) {
  const router = useRouter()

  const defaultItems = [
    { label: 'Home', href: `/${locale}/` },
  ]

  const breadcrumbItems = items ? [...defaultItems, ...items] : defaultItems

  return (
    <nav className="container py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 text-gray-500 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
