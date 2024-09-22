import useRegister from "@/hooks/use-register";
import Form from ".";

export default function RegisterForm() {
    const {formData, formErrors, onChange, onSubmitHandler, isLoading, isError, error } = useRegister()

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
            labelText: "Name",
            labelId: "name",
            type: "text",
            formType: "name",
            value: formData.name,
            required: true,
            options: [], // No options needed for name
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
        {
            labelText: "Confirm Password",
            labelId: "re_password",
            type: "password",
            formType: "re_password",
            value: formData.re_password,
            required: true,
            options: [], // No options needed for confirm password
        },
        {
            labelText: "Address",
            labelId: "address",
            type: "text",
            formType: "address",
            value: formData.address,
            required: true,
            options: [], // No options needed for name
        },
    ];

    return (
        // <Form 
        //     config={formConfig}
        //     isLoading={isLoading}
        //     btnText="Sign up"
        //     onChange={onChange}
        //     onSubmit={onSubmitHandler}
        // />
        <div className="max-w-md mx-auto mt-8">
            <h1 className="mb-4 text-2xl font-bold">Register</h1>
            <Form
                config={formConfig}
                isLoading={isLoading}
                btnText="Register"
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