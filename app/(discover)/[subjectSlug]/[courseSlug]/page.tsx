import { getSubject } from '@/app/api/subjects/getSubjects';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { courseSlug: string };
}) {
  const course = await getSubject({ slug: params.courseSlug });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">All {course.name}</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: course.count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
