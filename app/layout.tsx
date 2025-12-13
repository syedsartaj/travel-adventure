import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wanderlust - Travel Adventure Blog',
  description: 'Explore the world through immersive travel stories, stunning photography, and insider destination guides. Join us on a journey to discover hidden gems and iconic landmarks across the globe.',
  keywords: 'travel blog, adventure travel, destination guides, travel photography, world exploration, travel stories',
  authors: [{ name: 'Wanderlust Travel' }],
  openGraph: {
    title: 'Wanderlust - Travel Adventure Blog',
    description: 'Explore the world through immersive travel stories and stunning photography',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wanderlust - Travel Adventure Blog',
    description: 'Explore the world through immersive travel stories',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <div className="relative min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>

        {/* Background Overlay Pattern */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-sky-50 via-white to-orange-50 opacity-50 pointer-events-none" />
      </body>
    </html>
  )
}
