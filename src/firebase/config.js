import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCXgYazjg4l-s0Idk775miRGcw8wqAWn78",
  authDomain: "personal-finance-app-52aec.firebaseapp.com",
  projectId: "personal-finance-app-52aec",
  storageBucket: "personal-finance-app-52aec.appspot.com",
  messagingSenderId: "935536927352",
  appId: "1:935536927352:web:10c4737bfc6780ab18c38d"
};

// fireabase init
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore() 

// init firebase auth
const auth = getAuth()

// init firebase storage
const storage = getStorage()

// timestamp
const timestamp = serverTimestamp()

export { db, auth, storage, timestamp }