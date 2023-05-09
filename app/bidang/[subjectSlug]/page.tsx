import { getSubject } from '@/app/api/subjects/getSubjects';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { subjectSlug: string };
}) {
  const subject = await getSubject({ slug: params.subjectSlug });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">
        All {subject.name}
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
