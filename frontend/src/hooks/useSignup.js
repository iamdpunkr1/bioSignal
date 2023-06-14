import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup =()=>{
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (username, email, password, age, phno, user_type) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/signupAdmin',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username, email, password, age, phno, user_type})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
              // save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload:json})

             // update loading state
             setIsLoading(false)
        }
    }

    const signupUser = async (username, email, password, age, gender, phno, disease, user_type) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/signupUser',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username, email, password,age, gender, phno, disease, user_type})
        })

        const json = await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok){
              // save the user to local storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type:'LOGIN', payload:json})

             // update loading state
             setIsLoading(false)
        }
    }
    return {signup,signupUser, isLoading, error}
}