'use client'

import { ComputeEngine } from "@cortex-js/compute-engine";
import { useState } from "react";
import MathInput from "../math-input";
import { Button } from "@material-tailwind/react";
import { EvaluateResponse } from "@/app/(learn)/[subjectSlug]/[courseSlug]/[unitSlug]/[pageSlug]/latihan/[lessonSlug]/_components/lib/answer-type-component";

export default function MathInputComponent({
    answer,
    extras,
    onEvaluate
}: {
  answer: any, 
  extras: any,
  onEvaluate: (res: EvaluateResponse) => (void),
}) {
  const [latexInput, setLatexInput] = useState("");

  const handleSubmit = () => {
    const evaluateStruct = {
      latexInput,
      mathJSONCorrectAnswer: answer,
      simplify: extras?.simplify,
      tolerance: extras?.tolerance,
    } as MathInputAnswer;

    const evaluateRes = evaluateMathInput(evaluateStruct);
    onEvaluate(evaluateRes);
  };

  return (
    <>
      <MathInput
        className='min-w-[10rem]'
        onChange={(input: string) => setLatexInput(input)}
      />
      <Button onClick={handleSubmit}>Kirim</Button>
    </>
  );
};


interface MathInputAnswer {
    latexInput: string;
    mathJSONCorrectAnswer: any;
    simplify: boolean;
    tolerance: number
}

function evaluateMathInput(answer: MathInputAnswer) {   
    const ce = new ComputeEngine();
    // ce.tolerance = answer.tolerance;
    const boxedInput = ce.parse(answer.latexInput, { canonical: false })
    if (!boxedInput.isValid) {
        return {
            code: 400,
            message: "Jawaban kamu belum valid. Pastikan jawabanmu sudah lengkap."
        };
    }
    
    let canonicalAnswer = ce.box(answer.mathJSONCorrectAnswer);
    if (!canonicalAnswer.isValid) {
        return {
            code: 500,
            message: "Invalid answer from database"
        }
    }
    
    const passed = boxedInput.isEqual(canonicalAnswer)
    if (!passed) {
        return {
            code: 460,
            message: "Jawabanmu belum sesuai. Kamu bisa melihat petunjuk bila kesulitan."
        }
    }
    
    if (answer.simplify && boxedInput.latex != canonicalAnswer.latex) {
        return {
            code: 461,
            message: "Jawabanmu sudah benar, namun masih bisa disederhanakan."
        }
    }
    
    return {
      code: 200,
      message: "Jawaban kamu benar!"
    }
}