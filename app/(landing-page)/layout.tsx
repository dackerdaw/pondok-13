import '@/styles/globals.css';
import { AddressBar } from '@/ui/address-bar';
import Byline from '@/ui/byline';
import { Navbar } from '@/ui/navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Pondok Pelajar',
    template: '%s | Pondok Pelajar',
  },
  description: 'Belajar online gratis di Pondok Pelajar',
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
