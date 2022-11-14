import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

class AuthLogic {
  constructor() {
    this.auth = getAuth();
    this.firebaseAuth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    //this.githubProvider = new GithubAuthProvider()
  }

  getUserAuth = () => {
    return this.auth;
  };

  getGoogleAuthProvider = () => {
    return this.googleProvider;
  };

  login(providerName) {
    const authProvider = this.getProvider(providerName);
    //return signInWithPopup(this.firebaseAuth, authProvider);
    return signInWithPopup(this.firebaseAuth, authProvider);
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  onAuthChange(onUserChanged) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      onUserChanged(user);
    });
  }

  getProvider(providerName) {
    switch (providerName) {
      case "Google":
        return this.googleProvider;
      case "Github":
        return this.githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthLogic;

export const loginGoogle = (auth, googleProvider) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        resolve(user);
      })
      .catch((e) => reject(e));
  });
};
export const logout2 = (auth) => {
  window.localStorage.removeItem("userId");
  return new Promise((resolve, reject) => {
    auth.signOut().catch((e) => reject(alert(e + " : 로그아웃 오류입니다.")));
    resolve();
  });
};
export const onAuthChange2 = (auth) => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};
