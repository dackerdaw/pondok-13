export type Item = {
  name: string;
  slug: string;
  description?: string;
};

export const demos: { name: string; items: Item[] }[] = [
  {
    name: 'Belajar',
    items: [
      {
        name: 'Bidang',
        slug: 'matematika',
        description: 'Cari materi berdasarkan bidang ilmu',
      },
      {
        name: 'Tingkat pendidikan',
        slug: 'tingkat-pendidikan',
        description: 'Cari materi berdasarkan tingkat sekolah',
      },
    ],
  },
  {
    name: 'Tentang kami',
    items: [
      {
        name: 'Profil',
        slug: 'profil',
        description:
          'Profil kami',
      },
      {
        name: 'Feedback',
        slug: 'feedback',
        description: 'Berikan usulan atau laporkan bug',
      },
    ],
  },
  // {
  //   name: 'Sains',
  //   items: [
  //     {
  //       name: 'Matematika',
  //       slug: 'matematika',
  //       description: 'Satu ditambah satu sama dengan dua',
  //     },
  //     {
  //       name: 'Fisika',
  //       slug: 'fisika',
  //       description: 'Fisika adalah kekuatan dari dalam',
  //     },
  //   ],
  // },
  // {
  //   name: 'Sosial',
  //   items: [
  //     {
  //       name: 'Sejarah',
  //       slug: 'sejarah',
  //       description:
  //         'Jas merah jangan lupa sejarah',
  //     },
  //     {
  //       name: 'Ekonomi',
  //       slug: 'ekonomi',
  //       description: 'Eko eko eko nomomomi nomomomi desuka',
  //     },
  //   ],
  // },
];
