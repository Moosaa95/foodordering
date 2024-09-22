import LoginForm from "@/components/Form/LoginForm";
import { Link } from "react-router-dom";


export default function Login() {
    return (
        <div className="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-2xl font-bold leading-9 text-center text-gray-900 mt-19 tracking-right">
                    Login in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />
                <div className="mt-10 text-sm text-center text-gray-500">
                    dont have an account? {' '}
                    <Link to="/auth/register" className="font-semibold leading-6 text-indigo-100 hover:text-indigo-100">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}