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
  { name: 'Aljabar', slug: 'aljabar', count: 4, parent: 'matematika' },

  { name: 'Bab 1 - Latar Belakang', slug: 'bab-1-latar-belakang', count: 4, parent: 'aljabar' },
  //modul 1
  { name: 'Modul 1 - Variabel', slug: 'modul-1-variabel', count: 4, parent: 'bab-1-latar-belakang' },
  { name: 'Apa itu variabel?', slug: 'apa-itu-variabel', count: 4, parent: 'modul-1-variabel' },
  { name: 'Visualisasi variabel', slug: 'visualisasi-variabel', count: 4, parent: 'modul-1-variabel' },
  { name: 'Contoh', slug: 'contoh', count: 4, parent: 'modul-1-variabel' },
  //modul 2
  { name: 'Modul 2 - Konstanta', slug: 'modul-2-konstanta', count: 4, parent: 'bab-1-latar-belakang' },
  { name: 'Apa itu konstanta?', slug: 'apa-itu-konstanta', count: 4, parent: 'modul-2-konstanta' },
  { name: 'Visualisasi konstanta', slug: 'visualisasi-konstanta', count: 4, parent: 'modul-2-konstanta' },
  { name: 'Contoh konstanta', slug: 'contoh-konstanta', count: 4, parent: 'modul-2-konstanta' },
  //modul 3
  { name: 'Modul 3 - Persamaan', slug: 'modul-3-persamaan', count: 4, parent: 'bab-1-latar-belakang' },
  { name: 'Apa itu persamaan?', slug: 'apa-itu-persamaan', count: 4, parent: 'modul-3-persamaan' },
  { name: 'Visualisasi persamaan', slug: 'visualisasi-persamaan', count: 4, parent: 'modul-3-persamaan' },
  { name: 'Contoh persamaan', slug: 'contoh-persamaan', count: 4, parent: 'modul-3-persamaan' },
  
  { name: 'Bab 2 - Latar Tengah', slug: 'bab-2-latar-tengah', count: 4, parent: 'aljabar' },
  //modul lorem
  { name: 'lorem', slug: 'lorem', count: 4, parent: 'bab-2-latar-tengah' },
  { name: 'Apa itu lorem?', slug: 'apa-itu-lorem', count: 4, parent: 'lorem' },
  { name: 'Visualisasi lorem', slug: 'visualisasi-lorem', count: 4, parent: 'lorem' },
  { name: 'Contoh lorem', slug: 'contoh-lorem', count: 4, parent: 'lorem' },
  //modul ipsum
  { name: 'ipusm', slug: 'ipusm', count: 4, parent: 'bab-2-latar-tengah' },
  { name: 'Apa itu ipusm?', slug: 'apa-itu-ipusm', count: 4, parent: 'ipusm' },
  { name: 'Visualisasi ipusm', slug: 'visualisasi-ipusm', count: 4, parent: 'ipusm' },
  { name: 'Contoh ipusm', slug: 'contoh-ipusm', count: 4, parent: 'ipusm' },
  //modul dolor
  { name: 'dolor', slug: 'dolor', count: 4, parent: 'bab-2-latar-tengah' },
  { name: 'Apa itu dolor?', slug: 'apa-itu-dolor', count: 4, parent: 'dolor' },
  { name: 'Visualisasi dolor', slug: 'visualisasi-dolor', count: 4, parent: 'dolor' },
  { name: 'Contoh dolor', slug: 'contoh-dolor', count: 4, parent: 'dolor' },
  
  { name: 'Bab 3 - Latar Depan', slug: 'bab-3-latar-depan', count: 4, parent: 'aljabar' },

  { name: 'Trigonometri', slug: 'trigonometri', count: 5, parent: 'matematika' },
  { name: 'Kalkulus', slug: 'kalkulus', count: 2, parent: 'matematika' },

  { name: 'Fisika', slug: 'fisika', count: 12, parent: null },
  
  { name: 'Mekanika Klasik', slug: 'mekanika-klasik', count: 3, parent: 'fisika' },
  { name: 'Gelombang dan Elektromagnetik', slug: 'gelombang-dan-elektromagnetik', count: 4, parent: 'fisika' },
  { name: 'Fisika Kuantum', slug: 'fisika-kuantum', count: 5, parent: 'fisika' },

  { name: 'Biologi', slug: 'biologi', count: 10, parent: null },

  { name: 'Bioteknologi', slug: 'bioteknologi', count: 5, parent: 'biologi' },
  { name: 'Rekayasa Genetik', slug: 'rekayasa-genetik', count: 2, parent: 'biologi' },
  { name: 'Teori Kuman Penyakit', slug: 'teori-kuman-penyakit', count: 3, parent: 'biologi' },
];