import useLogin from "@/hooks/useLogin"
import Form from "."

export default function LoginForm() {
    const {formData, formErrors, onChange, onSubmitHandler, isError, isLoading, error} = useLogin() 
    const formConfig = [
        {
            labelText: "Email",
            labelId: "email",
            type: "email",
            formType: "email",
            value: formData.email,
            required: true,
            options: [], // No options needed for email
        },
        {
            labelText: "Password",
            labelId: "password",
            type: "password",
            formType: "password",
            value: formData.password,
            required: true,
            options: [], // No options needed for password
        },
    ]
    return (
        <div className="max-w-md mx-auto mt-8">
            <h1 className="mb-4 text-2xl font-bold">Login</h1>
            <Form
                config={formConfig}
                isLoading={isLoading}
                btnText="Login"
                onChange={onChange}
                onSubmit={onSubmitHandler}
                variant="default"
            />
            {/* Display form errors if any */}
            {Object.keys(formErrors).length > 0 && (
                <div className="mt-4 text-red-500">
                    {Object.values(formErrors).map((error, idx) => (
                        <p key={idx}>{error}</p>
                    ))}
                </div>
            )}
            {/* Display server error if any */}
            {isError && error && (
                <div className="mt-4 text-red-500">
                    <p>{"An error occurred"}</p>
                </div>
            )}
        </div>
    )
}