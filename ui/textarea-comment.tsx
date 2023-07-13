'use client';

import { Textarea, Button, IconButton } from "@material-tailwind/react";
import { LinkIcon } from "@heroicons/react/24/outline";
 
export default function TextareaComment() {
  return (
    <div className="relative max-w-[32rem] mx-auto">
      <Textarea variant="static" placeholder="Komentar mu" rows={8} />
      <div className="w-full flex justify-between py-1.5">
        {/* <IconButton variant="text" color="blue-gray" size="sm">
          <LinkIcon strokeWidth={2} className="w-4 h-4" />
        </IconButton> */}
        <div className="flex gap-2">
          <Button size="sm" className="rounded-md">Berikan komentar</Button>
        </div>
      </div>
    </div>
  );
}