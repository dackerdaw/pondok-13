"use client";

import React, { useEffect, useState } from 'react';
import { Alert, Button, Step, Stepper } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
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
      } catch (error) {
        console.log(`getting data error ${error}`)
      }

      if (loadTask == undefined) {
        loadTask = await prepareTask()
        try {
          const id = await db.tasks.add(loadTask)
        } catch (error) {
          console.log("saving data failed")
        }
      }

      setTask(loadTask)
    }

    init();
  }, [])

  // Check if the task object is defined before accessing its properties
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const questionListMaxIndex = task && task.assessmentItems.length > 0 ? task.assessmentItems.length - 1 : 0;
  const currentQuestion = task && task.assessmentItems[currentQuestionIndex];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertColor, setAlertColor] = useState<colors>();
  const [alertContent, setAlertContent] = useState("");
  
  
  const [activeStep, setActiveStep] = React.useState(task?.reservedItemsCompleted.length ?? 0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

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
                task?.reservedItemsCompleted.push(currentQuestion.id)

                db.tasks.update(practice.slug, { reservedItemsCompleted: task?.reservedItemsCompleted }).then((updated) => {
                  if (updated)
                    setActiveStep((curr) => curr + 1)
                  else
                    console.log("failed update");
                })
              } catch (error: any) {
                setAlertColor("orange")
                setAlertContent(error.message)
                setAlertOpen(true);
              }
            }}
            disabled={currentQuestionIndex !== activeStep}
            >Kirim</Button>
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


  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

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

        <div className="w-full py-4 px-8">
          <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
          >
            {task.assessmentItems.map((item, index) => {
              return (
                <Step key={index}
                  // onClick={() => setCurrentQuestionIndex(index)}
                  onClick={index <= activeStep ?
                    () => setCurrentQuestionIndex(index)
                    :
                    () => setCurrentQuestionIndex((curr) => curr)
                  }
                >{index + 1}</Step>
              )
            })}
          </Stepper>
          <div className="mt-16 flex justify-between">
            <Button onClick={prev}
              disabled={currentQuestionIndex === 0}>
              Prev
            </Button>
            <Button onClick={next}
              disabled={currentQuestionIndex === activeStep}>
              Next
            </Button>
          </div>
        </div>

        {/* <div className="flex items-center gap-4">

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
        </div> */}
      </>
    );
  } else {
    return <p>Loading...</p>
  }

}