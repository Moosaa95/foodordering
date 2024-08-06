import { Hero2, Hero3 } from "@/assets/images";
import { useRegisterUserMutation } from "@/hooks/features/endpoints/authApiSlice";

export default function HomePage() {
    const [registerUser] = useRegisterUserMutation()
    console.log('========HOME PAGE');
    const onSubmit  = async () => {
        console.log('ckicking==========')
        const userData = {
            auth0Id: "authOId",
            email: "lol@gmail.com",
            name: "new york",
        }
        try {
            await registerUser(userData).unwrap();
        } catch (error) {
            console.error('Failed to register user:', error);
        }
    }
    
    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-5 py-8 -mt-16 text-center bg-white rounded-lg shadow-md">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                    Tuck into a takeaway
                </h1>
                <button onClick={onSubmit}>Click</button>
                <span className="text-xl">Food is a click away</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
                <img src={Hero3} alt="" />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="text-3xl font-bold tracking-tighter">
                        Order takeaway faster
                    </span>
                    <span>Download</span>
                    <img src="" alt="app downlload" />
                </div>
            </div>
        </div>
    )
}