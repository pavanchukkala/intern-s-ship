import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kegth | The Ultimate Internship & Career Growth Platform',
  description:
    'Find top internships in tech (AI, ML, full-stack, cybersecurity, data science), medical fields (pulmonology, cardiology, biotech), and business (finance, marketing, HR). Kegth connects students and professionals with industry-leading companies for career growth.',
  keywords: [
    // Your full keywords list
    'kegth', 'internsship', 'intern-s-ship', 'internship platform', 'best internship site',
    'internships', 'paid internships', 'free internships', 'remote internships', 'online internships',
    'summer internships', 'part-time internships', 'full-time internships', 'internship portal',
    'software internships', 'AI internship', 'ML internship', 'full-stack internship', 'frontend internship',
    'backend internship', 'cybersecurity internship', 'blockchain internship', 'cloud computing internship',
    'devops internship', 'big data internship', 'quantum computing internship',
    'medical internships', 'pulmonology internship', 'cardiology internship', 'biotech internship',
    'pharmacy internship', 'clinical research internship', 'nursing internship', 'healthcare internship',
    'business internships', 'finance internship', 'marketing internship', 'HR internship', 'law internship',
    'data science internship', 'analytics internship', 'UI/UX internship',
    'internship certificate', 'internship experience', 'internship training', 'internship for students',
    'internship with stipend', 'internship opportunities in India', 'internship abroad',
    'internship in USA', 'internship in UK', 'internship in Germany', 'internship in India', 'internship near me'
  ],
  alternates: {
    canonical: 'https://www.kegth.com',
  },
  openGraph: {
    title: 'kegth | Find Top Internships & Career Opportunities',
    description:
      'Kegth is the leading internship platform offering opportunities in AI, ML, full-stack development, healthcare, business, and more.',
    url: 'https://www.kegth.com',
    siteName: 'kegth',
    images: [
      {
        url: 'https://www.kegth.com/favicon-32x32.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourTwitterHandle',
    title: 'kegth | Best Internship Platform for Career Growth',
    description:
      'Find paid and free internships in tech, medical, and business fields. Kegth connects students and professionals with top companies.',
    images: [
      'https://www.kegth.com/favicon-32x32.png',
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: 'https://www.kegth.com/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Find internships in tech, medical, and business fields." />

        {/* Favicon and manifest */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-adsense-account" content="ca-pub-9656827469317907">
        {/* Optional: MS Application support */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/android-chrome-192x192.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
