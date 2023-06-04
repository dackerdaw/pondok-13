import '@/styles/globals.css';
import { AddressBar } from '@/ui/address-bar';
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

        <div className="py-32">

          <div className="space-y-8 px-2 pt-20 lg:py-8 lg:px-8">


            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>

            {children}

          </div>
        </div>


      </body>
    </html>
  )
}
