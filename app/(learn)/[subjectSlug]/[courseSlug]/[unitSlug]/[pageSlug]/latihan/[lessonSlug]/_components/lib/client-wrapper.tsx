"use client";

import { Task } from "@/app/api/practices/getOrCreatePracticeTask";

import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import Latex from "react-latex-next";

export default function ClientWrapper({
  task,
  assessmentItems,
}: {
  task: Task
  assessmentItems: AssessmentItem[]
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questionListMaxIndex = assessmentItems.length === 0 ? 0 : assessmentItems.length - 1
  const currentQuestion = assessmentItems[currentQuestionIndex];

  console.log("HERE is question")
  console.log(currentQuestion)

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
      <h4 className="text-base font-large text-gray-300">Question {currentQuestionIndex + 1} - {currentQuestion ? currentQuestion.id : ""}</h4>
      
      <Latex >
        {currentQuestion.question}
      </Latex>

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
          <span>{`Pertanyaan ${currentQuestionIndex + 1}`}</span>
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
    </>
  );
}
