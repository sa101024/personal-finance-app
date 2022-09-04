import { useReducer } from 'react'
import { db, timestamp } from "../firebase/config"
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error:null }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null }
    case 'UPDATED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload }
    default:
      return state
  }
}

export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)

  // collection ref
  const ref = collection(db, c)

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp
      const addedDocument = await addDoc(ref, { ...doc, createdAt })
      dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatch({type: 'ERROR', payload: err.message })
    }
  }

  // delete a docuemnt
  const deleteDocument = async (id) => {
    // doc ref
    const docRef = doc(db, c, id)

    dispatch({ type: 'IS_PENDING' })

    try {
      await deleteDoc(docRef)
      dispatch({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatch({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  return { addDocument, deleteDocument, response }
}