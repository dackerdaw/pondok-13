import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function HintsComponent({
  question,
}: {
  question: AssessmentItem
}) {

  const hints = question.hints
  const [revealedIndex, setRevealedIndex] = useState(0)
  const revealedHints = hints.slice(0, revealedIndex)

  if (revealedIndex > 0) {
    return (
      <>
        <ul>
          {revealedHints.map((hint, index) => {
            return (
              <li key={index}>{hint}</li>
            );
          })}
        </ul>
        {revealedIndex >= hints.length ?
          null
          :
          <Button onClick={() => setRevealedIndex(revealedIndex + 1)}>Selanjutnya</Button>
        }
      </>
    )
  } else {
    return (
      <>
        <div>
          <span className="text-sm"><a href="#" onClick={() => setRevealedIndex(1)}>Merasa kesulitan? klik di sini untuk melihat petunjuk</a></span>
        </div>
      </>
    );
  }

};