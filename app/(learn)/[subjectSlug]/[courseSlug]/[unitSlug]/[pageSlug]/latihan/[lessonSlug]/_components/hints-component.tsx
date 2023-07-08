import { AssessmentItem } from "@/app/api/assessment-items/assessment-items";
import { Alert, Button, List, ListItem, ListItemPrefix, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import useSWR from 'swr';
import { DocumentTextIcon, PencilIcon, PlayIcon } from "@heroicons/react/24/outline";
import { convertSlugToReadable } from "@/lib/helper/convertSlugToReadable";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Latex from "react-latex";

export default function HintsComponent({
  currentQuestion,
}: {
  currentQuestion: AssessmentItem
}) {
  
  const [question, setQuestion] = useState(currentQuestion)
  const [revealRelatedContent, setRevealRelatedContent] = useState(false)
  const relatedContents = question.expand.problem_type_parent.related_contents

  useEffect(() => {
    return setRevealRelatedContent(false)
  }, [currentQuestion])

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
            <RevealHints hints={question.hints} />
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

function RevealHints({
  hints,
}: {
  hints: string[],
}) {
  const [revealedIndex, setRevealedIndex] = useState(0)
  const revealedHints = hints.slice(0, revealedIndex)

  if (revealedIndex > 0) {
    return (
      <>
        <ul className=" text-lg">
          {revealedHints.map((hint, index) => {
            return (
              <li key={index} className=" my-4">
                <Latex maxSize={20}>
                  {hint}
                </Latex>
              </li>
            )
          })}
        </ul>
        {revealedIndex < hints.length ?
          <Button
            onClick={() => setRevealedIndex(revealedIndex + 1)}
            fullWidth
          >
            Petunjuk berikutnya
          </Button>
          :
          null
        }
      </>
    )
  } else {
    return (
      <Button
        onClick={() => setRevealedIndex(1)}
        fullWidth
      >
        Dapatkan petunjuk
      </Button>
    )
  }
}


function arrayFetcher(urlArr: string[]) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  return Promise.all(urlArr.map(fetcher));
}

function useLessons(lessonIds: string[]) {

  // too imperative, make a prettier one someday
  let urlList = new Array<string>();
  for (let index = 0; index < lessonIds.length; index++) {
    const lessonId = lessonIds[index];
    urlList.push(`/api/lessons/${lessonId}`)
  }

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
  const pathname = usePathname();
  const segments = pathname.split('/').slice(1)
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
          <Link
            href={`/${segments[0]}/${segments[1]}/${segments[2]}/${segments[3]}/${lesson.lesson_type}/${lesson.lesson_slug}`}
            key={index}>
            <ListItem
              className="rounded-none text-sm py-1.5 px-3 font-normal text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
            >
              <ListItemPrefix>
                {lessonIcon}
              </ListItemPrefix>
              {convertSlugToReadable(lesson.lesson_slug)}
            </ListItem>
          </Link>

        )
      })}
    </List>
  )
}