import MathInputComponent from "@/ui/exercise-widgets/math-input-component";

export default function AnswerTypeComponent({
  answerType,
  answer,
  extras,
  onEvaluate,
}: {
  answerType: string
  answer: any,
  extras: any,
  onEvaluate: (res: EvaluateResponse) => (void),
}) {
  switch (answerType) {
    case "math-input":
      return <MathInputComponent
      answer={answer}
      extras={extras}
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