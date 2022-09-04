import { useEffect, useState, useRef } from 'react'
import { db } from "../firebase/config"

// firebase imports
import { collection, onSnapshot, where, query, orderBy } from "firebase/firestore";

export const useCollection = (c, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // set up query
  const q = useRef(_q).current

  useEffect(() => {
    let ref = collection(db, c)

    if (q) {
      ref = query(ref, where(...q), orderBy(..._orderBy))
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setDocuments(results)
      setError(null)
    }, (error) => {
      console.log(error)
      setError('Could not fetch the data')
    })

    // unsubscribe on unmount
    return () => unsubscribe()
  }, [c, q, _orderBy])

  return { documents, error }  
}