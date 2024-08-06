import { useRegisterUserMutation } from "@/hooks/features/endpoints/authApiSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
    const {user} = useAuth0()
    const [registerUser] = useRegisterUserMutation()
    const navigate = useNavigate()
    const hasCreatedUser = useRef(false)

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            const auth0Id = user.sub
            const email = user.email
            const name = user.name || ""
            
            const userData = {
                auth0Id: auth0Id,
                email: email,
                name: name,
            }
            try {
                registerUser(userData).unwrap();
                hasCreatedUser.current = true 
            } catch (error) {
                console.error('Failed to register user:', error);
            }
        }
        navigate('/')
    }, [registerUser, navigate, user])

    return <>Loading....</>

}

export default AuthCallbackPage
