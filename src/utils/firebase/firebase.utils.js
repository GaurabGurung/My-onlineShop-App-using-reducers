import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged, //listener when ever the auth state changes
} from 'firebase/auth';

import {
    getFirestore,
    doc, //methods for pulling a document
    getDoc, // method to get a file inside the documnet
    setDoc, // method to set a file inside the document
    collection, // mostly used to create or target a specific collection
    writeBatch, // creates a batch and writes a document using multiple methods to make it successfully  
    query, //to find documents with some specification
    getDocs, // use to fetch multiple documents
  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBz1Q0skavpAbDCo0G9EJNLwUvFLBiPfr8",
    authDomain: "online-shopping-testing.firebaseapp.com",
    projectId: "online-shopping-testing",
    storageBucket: "online-shopping-testing.appspot.com",
    messagingSenderId: "797436626799",
    appId: "1:797436626799:web:bd0909f0bca13ef7a74a9a"
};
    
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect (auth, googleProvider);

export const db = getFirestore();


export const addCollectionAndDocuments = async ( collectionKey, objectToAdd) => {
    const collectionRef = collection(db, collectionKey); // creating collection title as a reference
    const batch = writeBatch(db);

    objectToAdd.forEach((object)=> {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)  //it pulls out that specific document (object) using the docRef and set that object 
    })

    await batch.commit();
    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection (db, 'categories');
    const q = query (collectionRef);

    const querySnapShot = await getDocs (q);
    return querySnapShot.docs.map(docSnapshot => docSnapshot.data());
    
};

export const createUserDocumentFromAuth = async (
    userAuth , 
    additionalInformation = {}
    ) => {
    const userDocRef =  doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc (userDocRef);
 

    if(!userSnapShot.exists()) {
        const { displayName , email } = userAuth;
        const createdAt = new Date ();

        try {
            await setDoc (userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    } else {
        return userDocRef;
    }


} 

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => {
//    const res = await signOut(auth);
 signOut(auth)
//     console.log(res)
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged (auth, callback);