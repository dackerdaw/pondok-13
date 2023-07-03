'use client'

import MathInput from "../math-input";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";

export default function MathInputComponent({
    onMathInputChange,
}: {
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