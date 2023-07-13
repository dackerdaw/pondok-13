'use client'

import TextareaComment from "@/ui/textarea-comment"
import { usePathname } from 'next/navigation';

export default function CommentSection() {

  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)
  // const parsedUrl = `/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${segments[4]}/${segments[5]}`
  // console.log(parsedUrl)

  if (segments[4] == 'latihan') {
    return null
  } else {
    return (

      <div className=" my-8">
        <div className="w-full">
          <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">

              <div className="space-y-8 w-full lg:max-w-xl mx-auto">
                <h3 className="text-xl font-medium text-gray-300">Kolom komentar</h3>
                <TextareaComment />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}