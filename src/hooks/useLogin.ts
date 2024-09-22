import { useCallback, useState } from "react";
import { useLoginMutation } from "../redux/features/auth/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setAuth } from "../redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Add a toast notification library

// Define types for form data and error messages
interface FormData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    refreshToken: string;
}

interface FormErrors {
    email?: string;
    password?: string;
   
}

export default function useLogin() {
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation()

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }


        return errors;
    };

    // Handle form input changes
    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
        }
    }, []);

    // Handle form submission
    const onSubmitHandler = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const response = await login({ email, password }).unwrap() as LoginResponse;
            setFormData({
                email: '',
                password: ''
            })

            console.log(response, 'hey');
            
            // dispatch(setAuth()); // Authentication state is handled by `onQueryStarted`
            // toast.success("Login successful!"); // Notify the user of successful login
            alert('logged in');
            
            // navigate('/'); // Redirect to home page
            const redirectTo = location.state?.from?.pathname || "/";

            // Redirect to the original location or default to home
            navigate(redirectTo, { replace: true });

        } catch (err) {
            // Log error and notify user
            console.error("Failed to login:", err);
            // toast.error("Login failed. Please check your credentials and try again."); // Notify the user of the error
        }
    }, [dispatch, email, password, login, navigate]);

    return {
        formData,
        formErrors,
        isLoading,
        isError,
        error,
        onChange,
        onSubmitHandler
    };
}
