import { getCourses } from '@/lib/firebase/dto/course';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subjectSlug: string };
}) {
  const courses = await getCourses(params.subjectSlug);

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}`}
          items={[
            {
              text: 'All',
            },
            ...courses.map((x) => {
              const course = x.data()
              return {
                text: course.name,
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
  );
}
