// import { ChangeEvent, FormEvent, useState } from "react"
// import {useRegisterUserMutation} from "../hooks/features/endpoints/authApiSlice"
// export default function useRegister() {
//     const [registerUser, {isLoading}] = useRegisterUserMutation()

//     const [formData, setFormData] = useState({
//         auth0Id: "",
//         email: "",
//         name: "",
        
//     })

//     const {auth0Id, email, name} = formData

//     const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const {name, value} = event.target
//         setFormData({...formData, [name]: value})
//     }

//     const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault()
//         registerUser({
//             auth0Id,
//             email,
//             name
//         }).unwrap().then(() => {
//             console.log('SCUCCESSful');
            
//         })
//         .catch(err => {
//             console.log('FAILED====', err);
            
//         })
//     }

//     return {
//         authOId,
//         email,
//         name,
//         onChange,
//         onSubmitHandler,
//         isLoading
//     }
// }

// import { ChangeEvent, FormEvent, useState } from "react";
// import { useRegisterUserMutation, RegisterArgs } from "../hooks/features/endpoints/authApiSlice";


// interface FormErrors {
//     authOId?: string;
//     email?: string;
//     name?: string;
// }


// export default function useRegister() {
//     const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

//     const [formData, setFormData] = useState<RegisterArgs>({
//         authOId: "",
//         email: "",
//         name: "",
//     });

//     const [formErrors, setFormErrors] = useState<FormErrors>({
//         authOId: "",
//         email: "",
//         name: "",
//     });

//     const { authOId, email, name } = formData;

//     const validateForm = () => {
//         const errors: FormErrors = {};
//         if (!authOId) errors.authOId = "Auth0 ID is required";
//         if (!email) {
//             errors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(email)) {
//             errors.email = "Email is invalid";
//         }
//         return errors;
//     };

//     const onChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//         if (formErrors[name as keyof typeof formErrors]) {
//             setFormErrors({ ...formErrors, [name]: "" });
//         }
//     };

//     const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const errors = validateForm();
//         if (Object.keys(errors).length > 0) {
//             setFormErrors(errors);
//             return;
//         }
//         try {
//             await registerUser({ authOId, email, name }).unwrap();
//             setFormData({
//                 authOId: "",
//                 email: "",
//                 name: "",
//             });
//             // You can add any additional success handling here (e.g., redirect, notification)
//         } catch (err) {
//             // Error handling can be enhanced based on the error structure returned
//             console.error("Registration failed: ", err);
//         }
//     };

//     return {
//         formData,
//         formErrors,
//         isLoading,
//         isError,
//         error,
//         onChange,
//         onSubmitHandler,
//     };
// }

import { ChangeEvent, FormEvent, useState } from "react";
import { useRegisterUserMutation } from "@/hooks/features/endpoints/authApiSlice";

interface FormData {
    auth0Id: string;
    email: string;
    name: string;
}

interface FormErrors {
    auth0Id?: string;
    email?: string;
    name?: string;
}

export default function useRegister() {
    const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

    const [formData, setFormData] = useState<FormData>({
        auth0Id: "",
        email: "",
        name: "",
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const { auth0Id, email, name } = formData;

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};
        if (!auth0Id) errors.auth0Id = "Auth0 ID is required";
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!name) errors.name = "Name is required";
        return errors;
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        try {
            await registerUser({ auth0Id, email, name }).unwrap();
            setFormData({
                auth0Id: "",
                email: "",
                name: "",
            });
            // You can add any additional success handling here (e.g., redirect, notification)
        } catch (err) {
            // Error handling can be enhanced based on the error structure returned
            console.error("Registration failed: ", err);
        }
    };

    return {
        formData,
        formErrors,
        isLoading,
        isError,
        error,
        onChange,
        onSubmitHandler,
    };
}
