import { getUnits } from '@/app/api/units/delivery';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { unitSlug: string, courseSlug: string, subjectSlug: string };
}) {
  const units = await getUnits(`filter=(slug='${params.unitSlug}')`)
  const unit = units.items[0]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">All {unit.name}</h1>
      
      <div className="space-y-4 text-sm text-gray-200">
        <p>{unit.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: unit.index }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
