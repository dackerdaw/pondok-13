
export default function convertSlugToReadable(slug: string) {
  const excludedWords = [
    'dan', 'atau', 'dengan', 'di', 'ke', 'dari', 'untuk', 'dalam', 'pada', 'oleh', 'atas', 'bawah', 'bagi', 'tentang', 'mengenai', 'kepada', 'sampai', 'hingga', 'serta', 'yang', 'jika'
  ];
  const readable = slug.replace(/-./g, match => {
    const word = match.substring(1);
    return excludedWords.includes(word) ? match : match.charAt(1).toUpperCase();
  });
  return readable;
}