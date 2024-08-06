import { useRegisterUserMutation } from "@/hooks/features/endpoints/authApiSlice"
import {Auth0Provider} from  "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
type Props = {
    children: React.ReactNode
}

export default function Auth0ProviderWithNavigate({children}:Props){
    const navigate = useNavigate()
    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const redirectUrl = import.meta.env.VITE_AUTH0_CALLBACK_URL 


    if (!domain || !clientId || !redirectUrl) {
        throw new Error("Unable to initailise auth")
    }

    const onRedirectCallback = async() => {
        console.log('USER');
        navigate('/auth-callback')
       
        
    }

    return (
        <Auth0Provider domain={domain} clientId={clientId}
         authorizationParams={{
            redirect_uri: redirectUrl
        }}
            onRedirectCallback={onRedirectCallback}
        >{children}</Auth0Provider>
    )

}