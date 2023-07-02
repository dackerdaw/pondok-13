"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import Latex from "react-latex";
import MathInput from "@/ui/math-input";
import evaluateMathInput, { MathInputAnswer } from "@/lib/evaluate-answer/evaluate-latex";
import { colors } from '@material-tailwind/react/types/generic';
import { db } from '@/lib/dexie/database.config';
import { Practice } from '@/app/api/practices/practice';
import { Task } from '@/app/api/practices/getOrCreatePracticeTask';

export default function ClientWrapper({
  practice,
  prepareTask,
}: {
  practice: Practice
  prepareTask: () => Promise<Task>
}) {

  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const init = async () => {
      let loadTask;
      try {
        loadTask = await db.tasks
          .get(practice.slug)
        console.log(`getting data success ${loadTask}`)
      } catch (error) {
        console.log(`getting data error ${error}`)
      }

      if (loadTask == undefined) {
        loadTask = await prepareTask()
        try {
          const id = await db.tasks.add(loadTask)
          console.log(`saving data success ${id}`)
        } catch (error) {
          console.log("saving data failed")
        }
      }

      console.log(`final: ${loadTask}`)
      setTask(loadTask)
    }

    init();
  }, [])

  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // const questionListMaxIndex = taskRef.current!.assessmentItems.length === 0 ? 0 : taskRef.current!.assessmentItems.length - 1

  // Check if the task object is defined before accessing its properties
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questionListMaxIndex = task && task.assessmentItems.length > 0 ? task.assessmentItems.length - 1 : 0;
  const currentQuestion = task && task.assessmentItems[currentQuestionIndex];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertColor, setAlertColor] = useState<colors>();
  const [alertContent, setAlertContent] = useState("");



  const [latexInput, setLatexInput] = useState("");
  // const [mathJSONInput, setMathJSONInput] = useState();
  const renderInputComponent = () => {
    switch (currentQuestion?.answer_type) {
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
              className='min-w-[10rem]'
              onChange={(input: string) => setLatexInput(input)}
            />

            <Button onClick={() => {
              try {
                const pass = evaluateMathInput(evaluateStruct)
                setAlertColor("green");
                setAlertContent("Jawaban kamu benar!")
                setAlertOpen(true);
              } catch (error: any) {
                setAlertColor("orange")
                setAlertContent(error.message)
                setAlertOpen(true);
              }
            }}>Kirim</Button>
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

  if (currentQuestion) {
    return (
      <>
        <Latex >
          {currentQuestion?.question}
        </Latex>

        {renderInputComponent()}

        <Alert open={alertOpen} onClose={() => setAlertOpen(false)} color={alertColor}>
          {alertContent}
        </Alert>

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
  } else {
    return <p>Loading...</p>
  }

}