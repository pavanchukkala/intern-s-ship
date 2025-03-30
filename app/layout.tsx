import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kegth | The Ultimate Internship & Career Growth Platform',
  description:
    'Find top internships in tech (AI, ML, full-stack, cybersecurity, data science), medical fields (pulmonology, cardiology, biotech), and business (finance, marketing, HR). Keght connects students and professionals with industry-leading companies for career growth.',

  keywords: [
    // Primary Brand Keywords
    'kegth', 'internsship', 'intern-s-ship', 'internship platform', 'best internship site',
    
    // General Internship & Career Keywords
    'internships', 'paid internships', 'free internships', 'remote internships', 'online internships', 
    'summer internships', 'part-time internships', 'full-time internships', 'internship portal',
    
    // Tech Internships
    'software internships', 'AI internship', 'ML internship', 'full-stack internship', 'frontend internship',
    'backend internship', 'cybersecurity internship', 'blockchain internship', 'cloud computing internship',
    'devops internship', 'big data internship', 'quantum computing internship',

    // Medical Internships
    'medical internships', 'pulmonology internship', 'cardiology internship', 'biotech internship',
    'pharmacy internship', 'clinical research internship', 'nursing internship', 'healthcare internship',
    
    // Business & Other Fields
    'business internships', 'finance internship', 'marketing internship', 'HR internship', 'law internship',
    'data science internship', 'analytics internship', 'UI/UX internship',

    // Educational & Certification Keywords
    'internship certificate', 'internship experience', 'internship training', 'internship for students',
    'internship with stipend', 'internship opportunities in India', 'internship abroad',

    // Location-Based Keywords (Optional)
    'internship in USA', 'internship in UK', 'internship in Germany', 'internship in India', 'internship near me'
  ],

  alternates: {
    canonical: 'https://www.kegth.com',
  },

  openGraph: {
    title: 'keght | Find Top Internships & Career Opportunities',
    description:
      'Keght is the leading internship platform offering opportunities in AI, ML, full-stack development, healthcare, business, and more.',
    url: 'https://www.kegth.com',
    siteName: 'keght',
    images: [
      {
        url: 'https://raw.githubusercontent.com/pavanchukkala/intern-s-ship/main/BasicAssets/logo.jpg',
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
    title: 'keght | Best Internship Platform for Career Growth',
    description:
      'Find paid and free internships in tech, medical, and business fields. Keght connects students and professionals with top companies.',
    images: [
      'https://raw.githubusercontent.com/pavanchukkala/intern-s-ship/main/BasicAssets/logo.jpg',
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: 'https://raw.githubusercontent.com/pavanchukkala/intern-s-ship/main/BasicAssets/logo.jpg',
  },
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
