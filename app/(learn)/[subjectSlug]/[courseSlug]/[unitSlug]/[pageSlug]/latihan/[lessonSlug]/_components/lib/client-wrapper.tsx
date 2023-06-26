"use client";

import MathInput from "@/ui/math-input";
import { Task } from "@/app/api/practices/getOrCreatePracticeTask";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";

export default function ClientWrapper({
  task,
  getAssessmentItem,
}: {
  task: Task
  getAssessmentItem: (id: string, q: string) => Promise<AssessmentItem>
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questionList = task.reservedItems
  const questionListMaxIndex = questionList.length === 0 ? 0 : questionList.length - 1
  const currentQuestion = questionList[currentQuestionIndex];
  const [question, setQuestion] = useState<AssessmentItem>();
  
  useEffect(() => {
    async function prepareAssessment() {
      const question = await getAssessmentItem(questionList[currentQuestionIndex], 'expand=problem_type_parent');
      
      setQuestion(question);
    }
    prepareAssessment();
  }, [currentQuestionIndex])
  
  console.log("HERE is question")
  console.log(question)

  const getItemProps = (index: number) =>
  ({
    variant: currentQuestionIndex === index ? "filled" : "text",
    color: currentQuestionIndex === index ? "blue" : "blue-gray",
    onClick: () => setCurrentQuestionIndex(index),
  } as any);

  const next = () => {
    if (currentQuestionIndex === questionListMaxIndex) {
      return
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      return
    }
  };

  const prev = () => {
    if (currentQuestionIndex === 0) {
      return
    } else {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      return
    }
  };


  return (
    <>
      <h4 className="text-base font-large text-gray-300">Question {currentQuestionIndex + 1} - {currentQuestion ? currentQuestion : ""}</h4>

      <div className="flex items-center gap-4">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={prev}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <span>{`Bab ${currentQuestionIndex + 1}`}</span>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2"
          onClick={next}
          disabled={currentQuestionIndex === questionListMaxIndex}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {currentQuestion}
        </div>

      </div>

      <MathInput value="f(x)= \frac{\placeholder[numerator][x]{}}{\placeholder[denominator]{y}}" readOnly />
    </>
  );
}
