import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { Practice } from "@/app/api/practices/practice";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function HintsComponent({
  question,
}: {
  question: AssessmentItem
}) {

  const [revealRelatedContent, setRevealRelatedContent] = useState(false)
  const hints = question.hints
  const [revealedIndex, setRevealedIndex] = useState(0)
  const revealedHints = hints.slice(0, revealedIndex)
  
  console.log(question.expand.problem_type_parent.related_contents)

  if (revealRelatedContent) {
    return (
      <div className="grid grid-cols-4 gap-6">

        <div className="col-span-full lg:col-span-2">


              <div className="space-y-8">
                <h3 className="text-md font-medium text-gray-300">Konten terkait</h3>
              </div>

        </div>
        
        <div className="col-span-full lg:col-span-2">


              <div className="space-y-8">
                <h3 className="text-md font-medium text-gray-300">Masih kesulitan?</h3>

              </div>

        </div>

      </div>
    )

    // return (
    //   <>
    //     <ul>
    //       {revealedHints.map((hint, index) => {
    //         return (
    //           <li key={index}>{hint}</li>
    //         );
    //       })}
    //     </ul>
    //     {revealedIndex >= hints.length ?
    //       null
    //       :
    //       <Button onClick={() => setRevealedIndex(revealedIndex + 1)}>Selanjutnya</Button>
    //     }
    //   </>
    // )
  } else {
    return (
      <>
        <div>
          <span className="text-sm">Merasa kesulitan? <a className="underline text-blue-700" href="#" onClick={() => setRevealRelatedContent(true)}>Pelajari konten terkait atau gunakan petunjuk</a></span>
        </div>
      </>
    );
  }

};