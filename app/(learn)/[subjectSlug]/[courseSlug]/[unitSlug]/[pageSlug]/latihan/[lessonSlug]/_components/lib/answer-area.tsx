"use client";

import React, { useState } from 'react';
import MathInput from "@/ui/math-input";
import evaluateMathInput from '@/lib/evaluate-answer/evaluate-latex';

export default function AnswerArea({
  answerType,
  answerInput,
  answerOnChange,
}: {
  answerType: string
  answerInput: any,
  answerOnChange: any,
}) {

  switch (answerType) {
    case "math-input":
      return (
        <>
          <MathInput
            value={answerInput}
            onChange={answerOnChange}
          />
        </>
      );
    default:
      return null;
  }
}
