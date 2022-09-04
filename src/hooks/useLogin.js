import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

// firebase import
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    try {
      // login
      const res = await signInWithEmailAndPassword(auth, email, password)

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })
      setIsPending(false)
      setError(null)

    } catch (err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { login, isPending, error }
}