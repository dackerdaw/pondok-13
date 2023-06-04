import { getFirestore, collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Subject {
  name: string;
  index: number;
  description: string;
}

const db = getFirestore(firebase_app)

export async function getSubjects() {

  const subjectsRef = collection(db, "subjects").withConverter(
    converter<Subject>()
  );
  const q = query(subjectsRef);
  
  const subjects = await getDocs(q);

  return subjects.docs
}

export async function getSubject(subjectId: string) {

  const subjectRef = doc(db, 'subjects', subjectId).withConverter(
    converter<Subject>()
  );

  const docSnap = await getDoc(subjectRef);
  let subject
  if (docSnap.exists()) {
    subject = docSnap.data();
  } else {
    notFound();
  }

  return subject
}