import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import evaluateMathInput, { MathInputAnswer } from "@/lib/evaluate-answer/evaluate-latex";

export default function evaluateAnswer({
  question,
  answer,
}: {
  question: AssessmentItem,
  answer: any,
}) {

  let answerStruct

  switch (question.answer_type) {
    case "math-input":
      answerStruct = {
        mathJSONInput: answer,
        mathJSONCorrectAnswer: question.answer,
        simplify: question.extras.simplify,
        tolerance: question.extras.tolerance,
      } as MathInputAnswer;

      return evaluateMathInput(answerStruct);
    // Add cases for other answer types here
    default:
      return {
        code: 500,
        message: "Answer type not found"
      }
  }

};