import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import VerticalLinearStepper from "@/ui/vertical-stepper";

export default function HintsAccordion({
  question,
}: {
  question: AssessmentItem
}) {

  const hints = question.hints

  return (
    <>
      <VerticalLinearStepper
        steps={hints.map((hint, index) => ({
         label: `Langkah ${index}:`,
         description: hint,
        }))}
        lastStepCaption="Petunjuk terakhir"
        CompletedMessage="Semua langkah telah dilalui"
      />
    </>
  );
};