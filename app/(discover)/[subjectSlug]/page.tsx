import { getSubject } from '@/lib/firebase/dto/subject';
import { SkeletonCard } from '@/ui/skeleton-card';


export default async function Page({
  params,
}: {
  params: { subjectSlug: string };
}) {
  const subject = await getSubject(params.subjectSlug);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">
        All {subject.name}
      </h1>
      
      <div className="space-y-4 text-sm text-gray-200">
        <p>{subject.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: subject.index }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}