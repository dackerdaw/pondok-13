import { getFirestore, collection, query, getDocs, doc, getDoc, DocumentReference } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Lesson {
  content: DocumentReference
  index: number;
  lesson_code: 0 | 1 | 2;
  name: string;
}

const db = getFirestore(firebase_app)

export async function fetcherGetLessons(route: string) {

  const lessonsRef = collection(db, route).withConverter(
    converter<Lesson>()
  );
  const q = query(lessonsRef);
  
  const lessons = await getDocs(q);
  
  return lessons.docs
}

export async function getLessons(subjectId: string, courseId: string, unitId: string, moduleId: string) {

  const lessonsRef = collection(db, `subjects/${subjectId}/courses/${courseId}/units/${unitId}/modules/${moduleId}/lessons`).withConverter(
    converter<Lesson>()
  );
  const q = query(lessonsRef);
  
  const lessons = await getDocs(q);
  
  return lessons.docs
}

export async function getLesson(subjectId: string, courseId: string, unitId: string, moduleId: string, lessonId: string) {

  const lessonRef = doc(db, `subjects/${subjectId}/courses/${courseId}/units/${unitId}/modules/${moduleId}/lessons`, lessonId).withConverter(
    converter<Lesson>()
  );

  const docSnap = await getDoc(lessonRef);
  let lesson
  if (docSnap.exists()) {
    lesson = docSnap.data()
  } else {
    notFound();
  }

  return lesson
}