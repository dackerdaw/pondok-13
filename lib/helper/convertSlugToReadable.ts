  const excludedWords = [
    'dan', 'atau', 'dengan', 'di', 'ke', 'dari', 'untuk', 'dalam', 'pada', 'oleh', 'atas', 'bawah', 'bagi', 'tentang', 'mengenai', 'kepada', 'sampai', 'hingga', 'serta', 'yang', 'jika'
  ];

export function convertSlugToReadable(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b[a-z]/g, function() {
    return arguments[0].toUpperCase();
  });
}