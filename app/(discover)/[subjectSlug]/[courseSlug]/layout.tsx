import { getCourses } from '@/lib/pocketbase/courses/delivery';
import { getSubjects } from '@/lib/pocketbase/subjects/delivery';
import { getUnits } from '@/lib/pocketbase/units/delivery';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string, subjectSlug: string };
}) {
  const courses = await getCourses(`filter=(slug='${params.courseSlug}')`)
  const course = courses.items[0]
  const units = await getUnits(`filter=(course_id='${course.id}')`)

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}/${params.courseSlug}`}
          items={[
            {
              text: 'All'
            },
            ...units.items.map((x) => {
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
