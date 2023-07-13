import '@/styles/globals.css';
import { Navbar } from '@/ui/navbar';
import { Metadata } from 'next';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: {
    default: 'Pondok Pelajar',
    template: '%s | Pondok Pelajar',
  },
  description: 'Belajar online gratis di Pondok Pelajar',
  viewport: 'initial-scale=1, width=device-width',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
          <Navbar />
          {children}
      </body>
    </html>
  )
}
