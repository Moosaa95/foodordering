import { ChangeEvent, FormEvent, useState } from "react";
import { useRegisterUserMutation } from "../redux/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";


interface FormData {
    email: string;
    name: string;
    password: string;
    re_password: string;
    address?: string
}

interface FormErrors {
    email?: string;
    name?: string;
    password?: string;
    re_password?: string;
}

export default function useRegister() {
    const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormData>({
        email: "",
        name: "",
        password: "",
        re_password: "",
        address: "",
    });

    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const { email, name, password, re_password, address } = formData;

    const validateForm = (): FormErrors => {
        const errors: FormErrors = {};

        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }

        if (!name) errors.name = "Name is required";

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        if (!re_password) {
            errors.re_password = "Confirm Password is required";
        } else if (password !== re_password) {
            errors.re_password = "Passwords do not match";
        }

        return errors;
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when input is being corrected
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                [name]: "",
            }));
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
            await registerUser({ email, name, password, re_password, address }).unwrap();
            setFormData({
                email: "",
                name: "",
                password: "",
                re_password: "",
                address: ""
            });
            navigate('/auth/login')

            // Additional success handling (e.g., redirect, notification) can be added here
        } catch (err) {
            console.error("Registration failed: ", err);
            // Handle server errors if needed (e.g., setting formErrors based on the server response)
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
