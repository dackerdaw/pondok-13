import { getFirestore, collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Course {
  name: string;
  index: number;
  description: string;
}

const db = getFirestore(firebase_app)

export async function getCourses(subjectId: string) {

  const coursesRef = collection(db, `subjects/${subjectId}/courses`).withConverter(
    converter<Course>()
  );
  const q = query(coursesRef);
  
  const courses = await getDocs(q);

  return courses.docs
}

export async function getCourse(subjectId: string, courseId: string) {

  const courseRef = doc(db, `subjects/${subjectId}/courses`, courseId).withConverter(
    converter<Course>()
  );

  const docSnap = await getDoc(courseRef);
  let course
  if (docSnap.exists()) {
    course = docSnap.data();
  } else {
    notFound();
  }

  return course
}