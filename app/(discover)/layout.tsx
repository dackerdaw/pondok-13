import { getSubjects } from '@/lib/pocketbase/subjects/delivery';
import '@/styles/globals.css';
import { AddressBar } from '@/ui/address-bar';
import { ClickCounter } from '@/ui/click-counter';
import { Navbar } from '@/ui/navbar';
import { TabGroup } from '@/ui/tab-group';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Bidang Ilmu',
    template: '%s | Pondok Pelajar',
  },
  description: 'Pelajari bidang ilmu yang diinginkan',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const subjects = await getSubjects()
  return (
    <html lang="id" className="[color-scheme:dark]">
      <body className="bg-gray-1100 overflow-y-scroll bg-[url('/grid.svg')] pb-36">
        <Navbar />

        <div className="py-32">
          <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div>

            <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black p-3.5 lg:p-6">
                <div className="space-y-9">
                  <div className="flex justify-between">
                    <TabGroup
                      path=""
                      items={[
                        ...subjects.items.map((x) => 
                        {
                          return {
                            text: x.name,
                            slug: x.slug,
                          }
                        }),
                      ]}
                    />

                    <div className="self-start">
                      <ClickCounter />
                    </div>
                  </div>

                  <div>{children}</div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </body>
    </html>
  )
}
