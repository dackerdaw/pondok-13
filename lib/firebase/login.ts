import { app } from "./firebase-config";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

export default async function LoginGoogle() {
  let result = null,
    error = null;
  try {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((res) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = res.user;
        result = user
        // IdP data available using getAdditionalUserInfo(res)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
