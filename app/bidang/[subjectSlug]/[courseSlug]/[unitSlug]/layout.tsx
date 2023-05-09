import { getSubjects, getSubject } from '@/app/api/subjects/getSubjects';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unitSlug: string };
}) {
  const modules = await getSubjects({ parent: params.unitSlug });
  const unit = await getSubject({ slug: params.unitSlug });
  const course = await getSubject({ slug: unit.parent || "" });
  const subject = await getSubject({ slug: course.parent || "" });

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/bidang/${subject.slug}/${course.slug}/${unit.slug}`}
          items={[
            {
              text: 'All',
            },
            ...modules.map((x) => ({
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
