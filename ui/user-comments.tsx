'use client'

import { app } from "@/lib/firebase/firebase-config";
import IndividualComment from "./individual-comment";
import { getFirestore, getDocs, collection, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore(app)

export default function UserComments({
  lessonType,
  lessonSlug,
}: {
  lessonType: string,
  lessonSlug: string,
}) {

  const lessonKey = `${lessonType.slice(0,1)}_${lessonSlug}`
  console.log(lessonKey)
  const [comments, setComments] = useState<DocumentData[]>()

  useEffect(() => {
    async function loadComments() {
      const querySnapshot = await getDocs(collection(db, `lessons/${lessonKey}/comments`));
      setComments(querySnapshot.docs)
    }

    loadComments()
  }, [])

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">

        {comments?.map((comment, index) => {
          console.log(comment)
          return (
            <IndividualComment
            comment={comment}
            key={index} />
          )
        })}

      </div>
    </section>
  )
}