import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { Alert, Button, Chip, List, ListItem, ListItemPrefix, ListItemSuffix, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import useSWR, { Fetcher } from 'swr';
import { Cog6ToothIcon, DocumentTextIcon, InboxArrowDownIcon, PencilIcon, PlayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Lesson } from "@/app/api/lessons/lesson";
import { convertSlugToReadable } from "@/lib/helper/convertSlugToReadable";

export default function HintsComponent({
  question,
}: {
  question: AssessmentItem
}) {

  const [revealRelatedContent, setRevealRelatedContent] = useState(false)
  const hints = question.hints
  const relatedContents = question.expand.problem_type_parent.related_contents
  const [revealedIndex, setRevealedIndex] = useState(0)
  const revealedHints = hints.slice(0, revealedIndex)

  console.log(question.expand.problem_type_parent.related_contents)

  if (revealRelatedContent) {
    return (
      <div className="grid grid-cols-4 gap-6">

        <div className="col-span-full lg:col-span-2">


          <div className="space-y-8">
            <h3 className="text-md font-medium text-gray-300">Konten terkait</h3>
            <RelatedContents lessonIds={relatedContents} />
          </div>

        </div>

        <div className="col-span-full lg:col-span-2">


          <div className="space-y-8">
            <h3 className="text-md font-medium text-gray-300">Masih kesulitan?</h3>
            

          </div>

        </div>

      </div>
    )
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


function arrayFetcher(urlArr: string[]) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return Promise.all(urlArr.map(fetcher));
}

function useLessons(lessonIds: string[]) {

  console.log(lessonIds)
  // too imperative, make a prettier one someday
  let urlList = new Array<string>();
  for (let index = 0; index < lessonIds.length; index++) {
    const lessonId = lessonIds[index];
    urlList.push(`/api/lessons/${lessonId}`)
  }
  
  console.log(urlList)

  const { data, error, isLoading } = useSWR(urlList, arrayFetcher)

  return {
    lessons: data,
    isLoading,
    isError: error
  }
}

function RelatedContents({
  lessonIds
}: {
  lessonIds: string[]
}) {


  const { lessons, isLoading, isError } = useLessons(lessonIds)

  if (isLoading) return <Spinner />
  if (isError) return (
    <>
      <Alert
        variant="gradient"
        color="red"
        icon={<ExclamationTriangleIcon className="h-6 w-6" />}
      >
        Sorry, something went wrong.
      </Alert>
    </>
  )
  return (
    <List className="p-0 my-2">
      {lessons?.map((lesson, index) => {
        
        let lessonIcon;
        switch (lesson.lesson_type) {
          case "video":
            lessonIcon = <PlayIcon className="w-4 h-4" />
            break;
          case "article":
            lessonIcon = <DocumentTextIcon className="w-4 h-4" />
            break;
          default:
            lessonIcon = <PencilIcon className="w-4 h-4" />
            break;
        }
        return (
          <ListItem key={index}
            className="rounded-none text-sm py-1.5 px-3 font-normal text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
          >
            <ListItemPrefix>
              {lessonIcon}
            </ListItemPrefix>
            {convertSlugToReadable(lesson.lesson_slug)}
          </ListItem>
        )
      })}
    </List>
  )
}