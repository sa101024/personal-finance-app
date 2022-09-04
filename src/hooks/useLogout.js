import { useState } from "react"

// firebase imports
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { signOut } from "firebase/auth"

export const useLogout = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {
      // sign the user out
      await signOut(auth)

      // disatch logout action
      dispatch({ type: 'LOGOUT' })
    
      // update state
      setIsPending(false)
      setError(null)
    } catch(err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { logout, error, isPending }
}