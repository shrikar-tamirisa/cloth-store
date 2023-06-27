import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyDfE8XDK-9p8eVmmv85uahIOEBHWYDI8gc",
    authDomain: "crwn-db-b0a04.firebaseapp.com",
    projectId: "crwn-db-b0a04",
    storageBucket: "crwn-db-b0a04.appspot.com",
    messagingSenderId: "1059786381497",
    appId: "1:1059786381497:web:f90df95d0d49b09ba6e368",
    measurementId: "G-BQWVY7YQ4H"
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({ 
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;