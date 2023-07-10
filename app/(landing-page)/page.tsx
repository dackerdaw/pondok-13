import { demos } from '@/lib/demos';
import StyledFirebaseAuthClientWrapper from '@/ui/styled-firebase-auth';
import Link from 'next/link';

export default function Page() {
  return (

    <div className="py-32">
      <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">

        {/* <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div> */}

        <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
          <div className="rounded-lg bg-black p-3.5 lg:p-6">

            <div className="space-y-8">
              <h1 className="text-xl font-medium text-gray-300">Beranda</h1>

              <div className="space-y-10 text-white">
                {demos.map((section) => {
                  return (
                    <div key={section.name} className="space-y-5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {section.name}
                      </div>

                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {section.items.map((item) => {
                          return (
                            <Link
                              href={`/${item.slug}`}
                              key={item.name}
                              className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
                            >
                              <div className="font-medium text-gray-200 group-hover:text-gray-50">
                                {item.name}
                              </div>

                              {item.description ? (
                                <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                                  {item.description}
                                </div>
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              
              <StyledFirebaseAuthClientWrapper />

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
