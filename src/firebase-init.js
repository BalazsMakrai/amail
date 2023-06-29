import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAT-PCJ3888XcA2broSJUyhIQmI631bMLY",
    authDomain: "amail-389916.firebaseapp.com",
    projectId: "amail-389916",
    storageBucket: "amail-389916.appspot.com",
    messagingSenderId: "46316142125",
    appId: "1:46316142125:web:51dd15406fc53f1a9d42a4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {
    db
};
