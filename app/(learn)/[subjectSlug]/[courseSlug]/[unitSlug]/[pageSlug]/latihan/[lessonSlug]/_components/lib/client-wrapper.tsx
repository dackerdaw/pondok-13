"use client";

import MathInput from "@/ui/math-input";
import { Practice, ProblemType  } from "@/app/api/practices/practice";
import { getOrCreatePracticeTask } from "@/app/api/practices/getOrCreatePracticeTask";

export default function ClientWrapper({
  practice,
}: {
  practice: Practice
}) {
  
  let task = getOrCreatePracticeTask(practice);
  console.log(task);


  return (
    <MathInput value="f(x)= \frac{\placeholder[numerator][x]{}}{\placeholder[denominator]{y}}" readOnly />
  );
}
