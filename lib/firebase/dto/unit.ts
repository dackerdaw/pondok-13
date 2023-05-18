import { getFirestore, collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Unit {
  name: string;
  index: number;
  description: string;
}

const db = getFirestore(firebase_app)

export async function getUnits(subjectId: string, courseId: string) {

  const unitsRef = collection(db, `subjects/${subjectId}/courses/${courseId}/units`).withConverter(
    converter<Unit>()
  );
  const q = query(unitsRef);
  
  const units = await getDocs(q);

  return units.docs
}

export async function getUnit(subjectId: string, courseId: string, unitId: string) {

  const unitRef = doc(db,  `subjects/${subjectId}/courses/${courseId}/units`, unitId).withConverter(
    converter<Unit>()
  );

  const docSnap = await getDoc(unitRef);
  let unit
  if (docSnap.exists()) {
    unit = docSnap.data();
  } else {
    notFound();
  }

  return unit
}