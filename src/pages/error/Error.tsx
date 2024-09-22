import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-4 text-3xl font-semibold text-red-500">Page not found</h1>
                <p className="text-gray-600">
                    Sorry, the page you are looking for does not exist
                </p>
                <div className="mt-6">
                    <Link to="/" className="text-blue-500 hover:underline hover:text-blue-700">Go back to Home</Link>
                </div>
            </div>
        </div>
    )
}