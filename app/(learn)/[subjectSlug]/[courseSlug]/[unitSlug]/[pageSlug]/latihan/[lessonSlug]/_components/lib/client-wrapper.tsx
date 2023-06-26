"use client";

import { Task } from "@/app/api/practices/getOrCreatePracticeTask";

import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import Latex from "react-latex";
import MathInput from "@/ui/math-input";
import evaluateMathInput, { MathInputAnswer } from "@/lib/evaluate-answer/evaluate-latex";

export default function ClientWrapper({
  assessmentItems,
}: {
  assessmentItems: AssessmentItem[]
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questionListMaxIndex = assessmentItems.length === 0 ? 0 : assessmentItems.length - 1
  const currentQuestion = assessmentItems[currentQuestionIndex];
  
  
  const [latexInput, setLatexInput] = useState("");
  // const [mathJSONInput, setMathJSONInput] = useState();
  const renderInputComponent = () => {
    switch (currentQuestion.answer_type) {
      case "math-input":
        const evaluateStruct = {
          latexInput: latexInput,
          mathJSONCorrectAnswer: currentQuestion.answer,
          simplify: currentQuestion.extras.simplify,
          tolerance: currentQuestion.extras.tolerance,
        } as MathInputAnswer
        return (
          <>
            <MathInput
              onChange={(input: string) => setLatexInput(input)}
            />
            
            <button onClick={() => {
              try {
                const pass = evaluateMathInput(evaluateStruct)
                console.log(pass)
              } catch (error) {
                console.log(error)
              }
            }}>Kirim</button>
          </>
        );
      default:
        return null;
    }
  };

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
      <Latex >
        {currentQuestion.question}
      </Latex>

      {renderInputComponent()}

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