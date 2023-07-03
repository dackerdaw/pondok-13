"use client";

import { useEffect, useState } from 'react';
import { Alert, Button, Step, Stepper } from "@material-tailwind/react";
import Latex from "react-latex";
import { colors } from '@material-tailwind/react/types/generic';
import { db } from '@/lib/dexie/database.config';
import { Practice } from '@/app/api/practices/practice';
import { Task } from '@/app/api/practices/getOrCreatePracticeTask';
import AnswerTypeComponent, { EvaluateResponse } from './answer-type-component';
import evaluateMathInput, { MathInputAnswer } from '@/lib/evaluate-answer/evaluate-latex';

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

      // might wanna group these two condition together but idk how
      if (loadTask == undefined) {
        loadTask = await prepareTask()
        try {
          const id = await db.tasks.add(loadTask)
        } catch (error) {
          console.log("saving data failed")
        }
      }
      
      if (loadTask.reservedItemsCompleted.length >= loadTask.reservedItems.length) {
        loadTask = await prepareTask()
        try {
          const id = await db.tasks.update(loadTask.slug, loadTask)
        } catch (error) {
          console.log("saving data failed")
        }
      }

      setTask(loadTask)
      setCurrentQuestionIndex(loadTask.reservedItemsCompleted.length)
      setActiveStep(loadTask.reservedItemsCompleted.length)
    }

    init();
  }, [])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(task?.reservedItemsCompleted.length ? - 1 : 0)
  const questionListMaxIndex = task && task.assessmentItems.length > 0 ? task.assessmentItems.length - 1 : 0;
  const currentQuestion = task && task.assessmentItems[currentQuestionIndex];

  const [answer, setAnswer] = useState<any>()
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertColor, setAlertColor] = useState<colors>();
  const [alertContent, setAlertContent] = useState("");


  const [activeStep, setActiveStep] = useState(task && task.reservedItemsCompleted.length > 0 ? task.reservedItemsCompleted.length - 1 : 0);
  const [isCorrect, setIsCorrect] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  console.log(`current question index ${currentQuestionIndex}`)
  console.log(`current active step ${activeStep}`)
  
  const handleSubmit = () => {
    const evaluateStruct = {
      latexInput: answer,
      mathJSONCorrectAnswer: currentQuestion?.answer,
      simplify: currentQuestion?.extras?.simplify,
      tolerance: currentQuestion?.extras?.tolerance,
    } as MathInputAnswer;

    const evaluateRes = evaluateMathInput(evaluateStruct);
    handleAnswerSubmit(evaluateRes);
  };

  // const [mathJSONInput, setMathJSONInput] = useState();
  const handleAnswerSubmit = (res: EvaluateResponse) => {
    if (res.code == 200) {
      setAlertColor("green");
      setAlertContent("Jawaban kamu benar!");
      setAlertOpen(true);
      task?.reservedItemsCompleted.push(currentQuestion?.id!);
      db.tasks.update(practice.slug, { reservedItemsCompleted: task?.reservedItemsCompleted }).then((updated) => {
        if (updated) {
          setIsCorrect(true)
          if (task?.reservedItemsCompleted.length === task?.reservedItems.length) {
            setIsComplete(true)
          }
        } else {
          console.log("failed update");
        }
      });
    } else {
      setAlertColor("orange");
      setAlertContent(res.message);
      setAlertOpen(true);
    }
  };

  const next = () => {
    if (currentQuestionIndex === questionListMaxIndex) {
      return
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setActiveStep((curr) => curr + 1)
      setIsCorrect(false)
      setAlertOpen(false)
      return
    }
  };

  if (currentQuestion) {
    return (
      <>
        <Latex >
          {currentQuestion?.question}
        </Latex>

        <AnswerTypeComponent
          question={currentQuestion}
          onAnswerChange={setAnswer}
        />

        <Alert open={alertOpen} onClose={() => setAlertOpen(false)} color={alertColor}>
          {alertContent}
        </Alert>

        <div className="w-full py-4 px-8">
          <Stepper
            activeStep={activeStep}
          >
            {task.assessmentItems.map((item, index) => {
              return (
                <Step key={index}
                >{index + 1}</Step>
              )
            })}
          </Stepper>
          <div className="mt-16 flex justify-between">
            <NextButton
            handleNext={next}
            isCorrect={isCorrect}
            isComplete={isComplete}
            handleSubmit={handleSubmit}
            />
          </div>
        </div>

      </>
    );
  } else {
    return <p>Loading...</p>
  }

}

function NextButton({
  isCorrect,
  isComplete,
  handleNext,
  handleSubmit,
}: {
  isCorrect: boolean
  isComplete: boolean
  handleNext: () => void
  handleSubmit: any,
}) {
  if (isCorrect) {
    if (isComplete) {
      return (
        <Button disabled={true}>
          Selesai
        </Button>
      )
    } else {
      return (
        <Button onClick={handleNext}>
          Selanjutnya
        </Button>
      )
    }
  } else {
    return (
      <Button onClick={handleSubmit}>
        Kirim
      </Button>
    )
  }
}