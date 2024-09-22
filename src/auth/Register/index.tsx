import RegisterForm from "@/components/Form/RegisterForm";

export default function Register() {
    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-2xl font-bold leading-9 text-center text-gray-900 mt-19 tracking-right">
                    Sign Up to create an Account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <RegisterForm />
            </div>
        </div>
    )
}