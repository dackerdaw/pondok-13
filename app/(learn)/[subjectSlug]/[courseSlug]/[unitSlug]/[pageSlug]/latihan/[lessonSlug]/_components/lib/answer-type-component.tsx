import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import MathInputComponent from "@/ui/exercise-widgets/math-input-component";

export default function AnswerTypeComponent({
  question,
  onAnswerChange,
}: {
  question: AssessmentItem
  onAnswerChange: any,
}) {
  
  switch (question.answer_type) {
    case "math-input":
      return <MathInputComponent
      onMathInputChange={onAnswerChange}
      />;
    // Add cases for other answer types here
    default:
      return null;
  }
};

export interface EvaluateResponse {
  code: number,
  message: string,
}