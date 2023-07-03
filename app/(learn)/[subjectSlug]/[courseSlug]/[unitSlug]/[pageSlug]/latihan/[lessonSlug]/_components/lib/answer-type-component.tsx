import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import MathInputComponent from "@/ui/exercise-widgets/math-input-component";

export default function AnswerTypeComponent({
  question,
  onEvaluate,
}: {
  question: AssessmentItem
  onEvaluate: (res: EvaluateResponse) => (void),
}) {
  
  switch (question.answer_type) {
    case "math-input":
      return <MathInputComponent
      question={question}
      onEvaluate={onEvaluate}
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