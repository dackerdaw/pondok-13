import { getSubject } from '@/app/api/subjects/getSubjects';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { moduleSlug: string };
}) {
  const module = await getSubject({ slug: params.moduleSlug });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{module.name}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: module.count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
