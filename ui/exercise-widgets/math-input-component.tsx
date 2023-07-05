import MathInput from "../math-input";
import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";

export default function MathInputComponent({
  onMathInputChange,
  question,
}: {
  onMathInputChange: any,
  question: AssessmentItem,
}) {

  return (
    <>
      <MathInput
        question={question}
        className='min-w-[10rem]'
        onChange={(mathJSONInput: any) => onMathInputChange(mathJSONInput)}
      />
    </>
  );
};