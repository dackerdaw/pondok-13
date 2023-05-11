import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string, subjectSlug: string };
}) {
  const units = await getSubjects({ parent: params.courseSlug });

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/bidang/${params.subjectSlug}/${params.courseSlug}`}
          items={[
            {
              text: 'All',
            },
            ...units.map((x) => ({
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
