import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseApp } from "../FirebaseConfig";

export const useSignUp = () => {
  const fireauth = FirebaseApp.auth;

  const signUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(fireauth, email, password)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return { signUp };
};

export const useSignIn = () => {
  const fireauth = FirebaseApp.auth;

  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(fireauth, email, password)
      .then((res) => {
        // console.log(res.user);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return { signIn };
};

export const useUser = () => {
  const auth = FirebaseApp.auth;
  const user = auth.currentUser;

  if (user !== null) {
    const email = user.email;
    const uid = user.uid;

    const userInfo = {
      email,
      uid,
    };

    return { user: userInfo };
  } else {
    return { user };
  }
};

export const useSignOut = () => {
  const auth = FirebaseApp.auth;
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return { logout };
};
