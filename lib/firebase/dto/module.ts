import { getFirestore, collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";
import Lesson from "./lesson";

export default interface Module {
  name: string;
  index: number;
  description: string;
  lessons?: Lesson[];
}

const db = getFirestore(firebase_app)

export async function getModules(subjectId: string, courseId: string, unitId: string) {

  const modulesRef = collection(db, `subjects/${subjectId}/courses/${courseId}/units/${unitId}/modules`).withConverter(
    converter<Module>()
  );
  const q = query(modulesRef);
  
  const modules = await getDocs(q);

  return modules.docs
}

export async function getModule(subjectId: string, courseId: string, unitId: string, moduleId: string) {

  const moduleRef = doc(db, `subjects/${subjectId}/courses/${courseId}/units/${unitId}/modules`, moduleId).withConverter(
    converter<Module>()
  );

  const docSnap = await getDoc(moduleRef);
  let lessonModule
  if (docSnap.exists()) {
    lessonModule = docSnap.data()
  } else {
    notFound();
  }

  return lessonModule
}

export async function fetcherGetLessonModules(route: string) {

  const lessonModulesRef = collection(db, route).withConverter(
    converter<Module>()
  );
  const q = query(lessonModulesRef);
  
  const lessonModules = await getDocs(q);
  
  return lessonModules.docs
}