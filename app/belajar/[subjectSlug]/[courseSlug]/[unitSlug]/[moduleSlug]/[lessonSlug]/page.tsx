import { getSubject, getSubjects } from '@/app/api/subjects/getSubjects';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: { moduleSlug: string };
}) {
  const lesson = await getSubject({ slug: params.moduleSlug })
  
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">{lesson.name}</h1>

      <div className="space-y-10 text-white">
      </div>
    </div>
  );
}
