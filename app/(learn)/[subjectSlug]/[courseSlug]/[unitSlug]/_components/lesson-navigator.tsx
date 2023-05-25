'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Page } from '@/app/api/pages/pages';
import { UnitList } from '@/app/api/units/units';
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Lesson } from '@/app/api/lessons/lesson';

export default function LessonNavigator({
  expandedUnits
}: {
  expandedUnits: UnitList
}) {
  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)

  const [currentUnitIndex, setCurrentUnitIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  
  const unitList = expandedUnits
  let currentUnit = unitList.items[currentUnitIndex]
  let UnitLength = unitList.items.length
  console.log(UnitLength)

  let currentPageList = currentUnit.expand?.child_pages
  let currentPage = currentPageList?.[currentPageIndex]
  let PageLength = currentPage?.expand?.child_lessons.length ?? 0
  
  let currentLessonList = currentPage?.expand?.child_lessons

  const getItemProps = (index: number) =>
  ({
    variant: currentPageIndex === index ? "filled" : "text",
    color: currentPageIndex === index ? "blue" : "blue-gray",
    onClick: () => setCurrentPageIndex(index),
  } as any);

  const next = () => {
    if (currentPageIndex === PageLength-1) {
      if (currentUnitIndex === UnitLength-1) {
        return
      } else {
        setCurrentUnitIndex(currentUnitIndex+1)
        setCurrentPageIndex(0)
        return
      }
    }

    setCurrentPageIndex(currentPageIndex + 1);
  };

  const prev = () => {
    if (currentPageIndex === 0) {
      if (currentUnitIndex === 0) {
        return
      } else {
        setCurrentUnitIndex(currentUnitIndex-1)
        setCurrentPageIndex(0)
        return
      }
    }

    setCurrentPageIndex(currentPageIndex - 1);
  };
  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentPageIndex === 0
          && currentUnitIndex === 0}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <IconButton {...getItemProps(currentPageIndex)}>{currentPageIndex+1}</IconButton>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentPageIndex === PageLength-1
          && currentUnitIndex === UnitLength}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      <h4 className="text-base font-large text-gray-300">Unit: {currentUnit ? currentUnit.name : ""}</h4>
      
      <h4 className="text-base font-medium text-gray-300">Page: {currentPage ? currentPage.name : ""}</h4>

      <div className="space-y-10 text-white">

        <div className="space-y-5">
          {currentPage?.description}
        </div>
      </div>

      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {currentPage?.name}
        </div>

        <div className="grid grid-cols-1 gap-5">
          {currentLessonList?.map((lesson: Lesson) => {
            return (
              <Link
                href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${lesson.lesson_slug}`}
                key={lesson.id}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {lesson.lesson_slug}
                </div>

                <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                  {lesson.index}
                </div>

                <div className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-300">
                  {lesson.lesson_type}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}