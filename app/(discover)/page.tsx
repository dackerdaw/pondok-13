import { ExternalLink } from '@/ui/external-link';

export default function Page() {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Bidang Ilmu</h1>

      <ul>
        <li>
          Terdapat lebih dari 20+ bidang ilmu yang tersedia.
        </li>
        <li>Silakan pilih bidang ilmu yang menarik perhatian anda dan mulai belajar!.</li>
      </ul>

      <div className="flex gap-2">
        <ExternalLink href="https://beta.nextjs.org/docs/routing/pages-and-layouts">
          Docs
        </ExternalLink>
        <ExternalLink href="https://github.com/vercel/app-playground/tree/main/app/layouts">
          Code
        </ExternalLink>
      </div>
    </div>
  );
}
