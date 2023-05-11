import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { subjectSlug: string };
}) {
  const courses = await getSubjects({ parent: params.subjectSlug });

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/bidang/${params.subjectSlug}`}
          items={[
            {
              text: 'All',
            },
            ...courses.map((x) => ({
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
