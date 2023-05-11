import { getSubjects } from '@/app/api/subjects/getSubjects';
import { AddressBar } from '@/ui/address-bar';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';
import React from 'react';

export const metadata = {
  title: 'Bidang Ilmu',
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subjects = await getSubjects();

  return (

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
                  path="/bidang"
                  items={[
                    {
                      text: 'Home',
                    },
                    ...subjects.map((x) => ({
                      text: x.name,
                      slug: x.slug,
                    })),
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
  );
}
