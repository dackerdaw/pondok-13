import { getFirestore, doc, getDoc  } from "firebase/firestore";
import firebase_app from "../config";
import { converter } from "../converter";
import { notFound } from "next/navigation";

export default interface Article {
  name: string;
  article: string;
  preface: string;
}

const db = getFirestore(firebase_app)

export async function getArticle(articleId: string) {

  const articleRef = doc(db, `/articles`, articleId).withConverter(
    converter<Article>()
  );

  const docSnap = await getDoc(articleRef);
  let article
  if (docSnap.exists()) {
    article = docSnap.data()
  } else {
    notFound();
  }

  return article
}