import { Hero3 } from "@/assets/images";
import { useRegisterUserMutation } from "../../redux/features/auth/authApiSlice";
// import { useAuthToken } from "@/lib/utils";
// import { useAuth0 } from "@auth0/auth0-react";

export default function HomePage() {
    const [registerUser] = useRegisterUserMutation();
    // const { getAccessTokenSilently } = useAuth0();
    // const getAuthToken =  useAuthToken();

    // const onSubmit = async () => {
    //     try {
    //         const accessToken = await getAuthToken()
    //         console.log(accessToken, 'GETTTGUNIT');

    //         const userData = {
    //             auth0_id: "authOId",
    //             email: "lol@gmail.com",
    //             name: "new york",
    //         };

    //         await registerUser({ ...userData }).unwrap();
    //         console.log('User registered successfully');
    //     } catch (error) {
    //         console.error('Failed to register user:', error);
    //     }
    // };

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway
                </h1>
                {/* <button onClick={onSubmit}>Click</button> */}
                <span className="text-xl">Food is a click away</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                <img src={Hero3} alt="" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-3xl font-bold tracking-tighter">
                        Order takeaway faster
                    </span>
                    <span>Download</span>
                    <img src="" alt="app download" />
                </div>
            </div>
        </div>
    );
}
