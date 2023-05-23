import { getGroups } from '@/app/api/groups/delivery';
import { getUnits } from '@/app/api/units/delivery';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { unitSlug: string, courseSlug: string, subjectSlug: string };
}) {

  const units = await getUnits(`filter=(slug='${params.unitSlug}')`)
  const unit = units.items[0]
  const groups = await getGroups(`filter=(unit_id='${unit.id}')`)

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}/${params.courseSlug}/${params.unitSlug}`}
          items={[
            {
              text: 'All',
            },
            ...groups.items.map((x) => {
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
