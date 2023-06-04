import { getCourses } from '@/app/api/courses/delivery';
import { SkeletonCard } from '@/ui/skeleton-card';

export default async function Page({
  params,
}: {
  params: { courseSlug: string, subjectSlug: string };
}) {
  const courses = await getCourses(`filter=(slug='${params.courseSlug}')`)
  const course = courses.items[0]

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">All {course.name}</h1>

      <div className="space-y-4 text-sm text-gray-200">
        <p>{course.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: course.index }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
