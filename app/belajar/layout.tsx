import { getSubjects } from '@/app/api/subjects/getSubjects';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';
import React from 'react';

export const metadata = {
  title: 'Belajar',
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

        <div className="self-start">
          <ClickCounter />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
