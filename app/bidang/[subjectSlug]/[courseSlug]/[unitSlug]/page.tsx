import { getSubject } from '@/app/api/subjects/getSubjects';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { unitSlug: string };
}) {
  const unit = await getSubject({ slug: params.unitSlug });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{unit.name}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: unit.count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
