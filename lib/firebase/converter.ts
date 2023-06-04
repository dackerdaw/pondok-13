import { PartialWithFieldValue, QueryDocumentSnapshot } from "firebase/firestore";

// Firestore data converter
export const converter = <T>() => ({
  toFirestore: (data: PartialWithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});