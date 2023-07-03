'use client'

import { useEffect, useState } from "react";
import MathInput from "../math-input";
import { Button } from "@material-tailwind/react";
import { EvaluateResponse } from "@/app/(learn)/[subjectSlug]/[courseSlug]/[unitSlug]/[pageSlug]/latihan/[lessonSlug]/_components/lib/answer-type-component";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import evaluateMathInput, { MathInputAnswer } from "@/lib/evaluate-answer/evaluate-latex";

export default function MathInputComponent({
    question,
    onMathInputChange,
}: {
  question: AssessmentItem
  onMathInputChange: any,
}) {
  
  return (
    <>
      <MathInput
        className='min-w-[10rem]'
        onChange={(input: string) => onMathInputChange(input)}
      />
    </>
  );
};