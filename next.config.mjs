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
  // Other metadata properties as needed...
  icons: {
    // Use your external image URL as the favicon.
    // Note: Favicons are typically ICO or PNG files, but many browsers support JPG.
    icon: 'https://raw.githubusercontent.com/pavanchukkala/intern-s-ship/main/BasicAssets/logo.jpg',
    // Optionally, if you want alternative sizes or Apple-specific icons, add them here.
    // shortcut: 'https://your-url-to-shortcut-icon.png',
    // apple: 'https://your-url-to-apple-icon.png',
  },
  // Additional metadata (openGraph, twitter, etc.) remains as before.
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
