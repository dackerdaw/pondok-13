import { getModules } from '@/lib/firebase/dto/module';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const modules = await getModules(params.subjectSlug, params.courseSlug, params.unitSlug)

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}`}
          items={[
            {
              text: 'All',
            },
            ...modules.map((x) => {
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
