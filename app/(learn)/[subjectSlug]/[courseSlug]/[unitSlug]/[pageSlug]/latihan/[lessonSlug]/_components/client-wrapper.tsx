"use client";

import { useEffect, useState } from 'react';
import { Alert, Button, Step, Stepper } from "@material-tailwind/react";
import Latex from "react-latex";
import { colors } from '@material-tailwind/react/types/generic';
import { db } from '@/lib/dexie/database.config';
import { Practice } from '@/app/api/practices/practice';
import { Task, TaskProgress } from '@/app/api/practices/getOrCreatePracticeTask';
import AnswerTypeComponent from './answer-type-component';
import evaluateAnswer from './lib/evaluate-answer-type';
import HintsComponent from './hints-component';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

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
  const [isFail, setIsFail] = useState(false);
  const [progress, setProgress] = useState<TaskProgress[]>([])

  const [activeStep, setActiveStep] = useState(task && task.reservedItemsCompleted.length > 0 ? task.reservedItemsCompleted.length - 1 : 0);
  const [isCorrect, setIsCorrect] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [hintOpen, setHintOpen] = useState(0);
  const handleOpen = (value: number) => {
    setHintOpen(hintOpen === value ? 0 : value);
  };

  // refactor to simpler db call, very ugly
  const handleSubmit = () => {
    const evaluateRes = evaluateAnswer({
      question: currentQuestion!,
      answer: answer,
    })

    if (evaluateRes.code == 200) {
      setAlertColor("green");
      setAlertContent("Jawaban kamu benar!");
      setAlertOpen(true);

      if (!isFail) {
        const progressItem = {
          assessmentItemId: currentQuestion?.id,
          fail: false,
        } as TaskProgress

        task?.progress.push(progressItem);
      }

      task?.reservedItemsCompleted.push(currentQuestion?.id!);
      db.tasks.update(practice.slug, {
        reservedItemsCompleted: task?.reservedItemsCompleted,
        progress: task?.progress,
       }).then((updated) => {
        if (updated) {
          setIsCorrect(true)
          if (task?.reservedItemsCompleted.length === task?.reservedItems.length) {
            setIsComplete(true)
          }
        } else {
          console.log("failed update");
        }
      });
    } else if (evaluateRes.code == 461) {
      setAlertColor("orange");
      setAlertContent(evaluateRes.message);
      setAlertOpen(true);
    } else {
      setAlertColor("orange");
      setAlertContent(evaluateRes.message);
      setAlertOpen(true);

      if (!isFail) { // will only update if first time fail
        const progressItem = {
          assessmentItemId: currentQuestion?.id,
          fail: true,
        } as TaskProgress

        task?.progress.push(progressItem);
        db.tasks.update(practice.slug, { progress: task?.progress }).then((updated) => {
          if (updated) {
            setIsFail(true);
          } else {
            console.log("failed update fail status");
          }
        });
      }

    }
  }

  const next = () => {
    if (currentQuestionIndex === questionListMaxIndex) {
      return
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setActiveStep((curr) => curr + 1)
      setIsCorrect(false)
      setAlertOpen(false)
      setIsFail(false)
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


        <div className="w-full py-4 px-8">

          <div className="flex justify-between">
            <NextButton
              handleNext={next}
              isCorrect={isCorrect}
              isComplete={isComplete}
              handleSubmit={handleSubmit}
            />
          </div>
          <Stepper
            activeStep={activeStep}
            className='mt-16'
          >
            {task.assessmentItems.map((item, index) => {
              const progressItem = task.progress[index]
              console.log(progressItem)
              if (progressItem) {
                return (
                  <Step key={index}
                    className='h-4 w-4'
                  >
                    {progressItem.fail ?
                      <XMarkIcon className='w-4 h-4' />
                      :
                      <CheckIcon className='w-4 h-4' />
                    }
                  </Step>
                )
              } else {
                return <Step key={index} className='h-4 w-4' />
              }
            })}
          </Stepper>
        </div>

        <Alert open={alertOpen} onClose={() => setAlertOpen(false)} color={alertColor}>
          {alertContent}
        </Alert>

        <HintsComponent
          currentQuestion={currentQuestion}
        />
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