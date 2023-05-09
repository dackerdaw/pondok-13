import { getBaseUrl } from '@/lib/getBaseUrl';
import { notFound } from 'next/navigation';
import type { Subject } from './subject';

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.
import 'server-only';

export async function getSubjects({ parent }: { parent?: string } = {}) {
  const res = await fetch(
    `${getBaseUrl()}/api/subjects${parent ? `?parent=${parent}` : ''}`,
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const subjects = (await res.json()) as Subject[];

  if (subjects.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return subjects;
}

export async function getSubject({ slug }: { slug: string }) {
  const res = await fetch(
    `${getBaseUrl()}/api/subjects${slug ? `?slug=${slug}` : ''}`,
  );

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const subject = (await res.json()) as Subject;

  if (!subject) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return subject;
}
