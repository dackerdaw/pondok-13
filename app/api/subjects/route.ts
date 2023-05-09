import type { Subject } from './subject';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // We sometimes artificially delay a reponse for demo purposes.
  // Don't do this in real life :)
  const delay = searchParams.get('delay');
  if (delay) {
    await new Promise((resolve) => setTimeout(resolve, Number(delay)));
  }

  const slug = searchParams.get('slug');
  if (slug) {
    const subject = data.find((subject) => subject.slug === slug);

    return new Response(JSON.stringify(subject ?? null), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  const parent = searchParams.get('parent');
  const subjects = data.filter((subject) =>
    parent ? subject.parent === parent : subject.parent === null,
  );

  return new Response(JSON.stringify(subjects), {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  });
}

const data: Subject[] = [
  { name: 'Matematika', slug: 'matematika', count: 11, parent: null },
  { name: 'Fisika', slug: 'fisika', count: 12, parent: null },
  { name: 'Biologi', slug: 'biologi', count: 10, parent: null },
  { name: 'Aljabar', slug: 'aljabar', count: 4, parent: 'matematika' },
  { name: 'Trigonometri', slug: 'trigonometri', count: 5, parent: 'matematika' },
  { name: 'Kalkulus', slug: 'kalkulus', count: 2, parent: 'matematika' },
  { name: 'Mekanika Klasik', slug: 'mekanika-klasik', count: 3, parent: 'fisika' },
  { name: 'Gelombang dan Elektromagnetik', slug: 'gelombang-dan-elektromagnetik', count: 4, parent: 'fisika' },
  { name: 'Fisika Kuantum', slug: 'fisika-kuantum', count: 5, parent: 'fisika' },
  { name: 'Bioteknologi', slug: 'bioteknologi', count: 5, parent: 'biologi' },
  { name: 'Rekayasa Genetik', slug: 'rekayasa-genetik', count: 2, parent: 'biologi' },
  { name: 'Teori Kuman Penyakit', slug: 'teori-kuman-penyakit', count: 3, parent: 'biologi' },
];