import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'internsship | Leading Internship Platform for Future Innovators',
  description:
    'Internsship is a cutting-edge internship platform connecting top talent with industry-leading companies. Experience innovation, career growth, and industry-level SEO in one place.',
  keywords: [
    'internship',
    'innovation',
    'tech internships',
    'career opportunities',
    'industry level SEO',
    'future innovators',
    'internsship',
  ],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'internsship | Leading Internship Platform for Future Innovators',
    description:
      'Join internsship to connect with top companies and boost your career through innovative internships and cutting-edge technology.',
    url: 'https://intern-s-ship.vercel.app', // Your current Vercel URL
    siteName: 'internsship',
    images: [
      {
        url: 'https://intern-s-ship.vercel.app/og-image.png', // Update with your OG image URL if available
        width: 1200,
        height: 630,
        alt: 'internsship Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'internsship | Leading Internship Platform for Future Innovators',
    description:
      'Internsship connects top talent with industry-leading companies for innovative internships and career growth.',
    site: '@internsship', // Update with your Twitter handle if available
    creator: '@internsship', // Update with your Twitter handle or creator name
  },
  alternates: {
    canonical: 'https://intern-s-ship.vercel.app',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  category: 'Business',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
