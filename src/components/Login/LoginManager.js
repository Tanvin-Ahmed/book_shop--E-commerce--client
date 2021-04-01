import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializationLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUserInfo = { ...user };
            newUserInfo.displayName = name;
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserProfile(name);
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}

const updateUserProfile = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('Profile Updated.');
    }).catch(function (error) {
        console.log('Profile Update Error : ', error);
    });
}


export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = error.credential;
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}



export const signOut = () => {
    firebase.auth().signOut().then(() => {
        console.log('Log out successfully');
    }).catch((error) => {
        console.log('LogOut error : ', error);
    });
}