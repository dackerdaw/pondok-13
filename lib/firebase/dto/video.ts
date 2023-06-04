import { getFirestore, doc, getDoc  } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Video {
  name: string;
  description: string;
  transcript: string;
  url: string;
}

const db = getFirestore(firebase_app)

export async function getVideo(videoId: string) {

  const videoRef = doc(db, `/videos`, videoId).withConverter(
    converter<Video>()
  );

  const docSnap = await getDoc(videoRef);
  let video
  if (docSnap.exists()) {
    video = docSnap.data()
  } else {
    notFound();
  }

  return video
}