import { getSubjects } from '@/app/api/subjects/getSubjects';
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
  );
}
