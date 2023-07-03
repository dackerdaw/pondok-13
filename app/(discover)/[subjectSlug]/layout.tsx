import { getCourses } from '@/app/api/courses/delivery';
import { getSubjects } from '@/app/api/subjects/delivery';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subjectSlug: string };
}) {
  const subjects = await getSubjects(`filter=(slug='${params.subjectSlug}')`)
  const subject = subjects.items[0]
  const courses = await getCourses(`filter=(subject_id='${subject.id}')`)

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}`}
          items={[
            {
              text: 'All',
            },
            ...courses.items.map((x) => {
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
  );
}
