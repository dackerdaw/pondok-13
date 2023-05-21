'use client';

import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
 
export default function Paginator({
  currentModule,
  max
}:
{
  currentModule: number,
  max: number
}) {
  const [active, setActive] = React.useState(currentModule);
 
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: active === index ? "blue" : "blue-gray",
      onClick: () => setActive(index),
    } as any);
 
  const next = () => {
    if (active === max) return;
 
    setActive(active + 1);
  };
 
  const prev = () => {
    if (active === 0) return;
 
    setActive(active - 1);
  };
 
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={active === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(-1)}>{active}</IconButton>
      </div>
      <Button
        variant="text"
        color="blue-gray"
        className="flex items-center gap-2"
        onClick={next}
        disabled={active === max}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}