"use client";

import { useEffect, useState } from 'react';
import { Alert, Button, Step, Stepper } from "@material-tailwind/react";
import Latex from "react-latex";
import { colors } from '@material-tailwind/react/types/generic';
import { db } from '@/lib/dexie/database.config';
import { Practice } from '@/app/api/practices/practice';
import { Task } from '@/app/api/practices/getOrCreatePracticeTask';
import AnswerTypeComponent, { EvaluateResponse } from './answer-type-component';

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
      setCurrentQuestionIndex(loadTask.reservedItemsCompleted.length)
      setActiveStep(loadTask.reservedItemsCompleted.length)
    }

    init();
  }, [])

  // Check if the task object is defined before accessing its properties
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(task?.reservedItemsCompleted.length ? - 1 : 0)
  const questionListMaxIndex = task && task.assessmentItems.length > 0 ? task.assessmentItems.length - 1 : 0;
  const currentQuestion = task && task.assessmentItems[currentQuestionIndex];

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertColor, setAlertColor] = useState<colors>();
  const [alertContent, setAlertContent] = useState("");


  const [activeStep, setActiveStep] = useState(task && task.reservedItemsCompleted.length > 0 ? task.reservedItemsCompleted.length - 1 : 0);
  const [preventNext, setPreventNext] = useState(true)
  console.log(`current question index ${currentQuestionIndex}`)
  console.log(`current active step ${activeStep}`)

  // const [mathJSONInput, setMathJSONInput] = useState();
const handleAnswerSubmit = (res: EvaluateResponse) => {
    if (res.code == 200) {
      setAlertColor("green");
      setAlertContent("Jawaban kamu benar!");
      setAlertOpen(true);
      task?.reservedItemsCompleted.push(currentQuestion?.id!);
      db.tasks.update(practice.slug, { reservedItemsCompleted: task?.reservedItemsCompleted }).then((updated) => {
        if (updated) {
          setPreventNext(false)
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
      setPreventNext(true)
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
          answerType={currentQuestion.answer_type}
          answer={currentQuestion.answer}
          extras={currentQuestion.extras}
          onEvaluate={handleAnswerSubmit}
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
            <Button onClick={next}
              disabled={preventNext}>
              Next
            </Button>
          </div>
        </div>

      </>
    );
  } else {
    return <p>Loading...</p>
  }

}