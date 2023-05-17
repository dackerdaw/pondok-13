import '@/styles/globals.css';
import { AddressBar } from '@/ui/address-bar';
import { ClickCounter } from '@/ui/click-counter';
import { Navbar } from '@/ui/navbar';
import { TabGroup } from '@/ui/tab-group';
import { Metadata } from 'next';
import React from 'react';
import firebase_app from '@/lib/firebase/config'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';
import { converter } from '@/lib/firebase/converter';
import Subject from '@/lib/firebase/dto/subject';

export const metadata: Metadata = {
  title: {
    default: 'Bidang Ilmu',
    template: '%s | Pondok Pelajar',
  },
  description: 'Pelajari bidang ilmu yang diinginkan',
}

const db = getFirestore(firebase_app)
async function getSubjects() {

  const subjectsRef = collection(db, "subjects").withConverter(
    converter<Subject>()
  );
  const q = query(subjectsRef);
  
  const subjects = await getDocs(q);

  return subjects.docs
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
                        ...subjects.map((x) => 
                        {
                          const subject = x.data()
                          return {
                            text: subject.name,
                            slug: x.id,
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
