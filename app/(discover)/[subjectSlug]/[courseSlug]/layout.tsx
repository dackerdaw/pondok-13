import { getUnits } from '@/lib/firebase/dto/unit';
import { ClickCounter } from '@/ui/click-counter';
import { TabGroup } from '@/ui/tab-group';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseSlug: string, subjectSlug: string };
}) {
  const units = await getUnits(params.subjectSlug, params.courseSlug)

  return (
    <div className="space-y-9">
      <div className="flex justify-between">
        <TabGroup
          path={`/${params.subjectSlug}/${params.courseSlug}`}
          items={[
            {
              text: 'All'
            },
            ...units.map((x) => {
              const unit = x.data()
              return {
                text: unit.name,
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
