// import {z} from "zod"
// import {zodResolver} from '@hookform/resolvers/zod'
// import { useForm } from "react-hook-form";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { Spinner } from "../Spinner";
// import { Button } from "../ui/button";
// import useAuth from "@/hooks/useAuth";
// import { useEffect } from "react";

// const userUpdateSchema = z.object({
//     email: z.string()
//         .email("Invalid email address"),
//     name: z.string()
//         .min(1, "Name is required")
//         .max(255, "Name must be less than 255 characters"),
//     city: z.string()
//         .max(100, "City must be less than 100 characters")
//         .optional(),
//     address: z.string()
//         .max(255, "Address must be less than 255 characters")
//         .optional(),
// });


// type UserUpdateForm = z.infer<typeof userUpdateSchema>;

// type Props = {
//     onSave: (userProfileData: UserUpdateForm) => void
//     isLoading: boolean;

// }

// export default function UserProfileForm ({onSave, isLoading}:Props) {
//     const {user, isAuthenticated, isFetchingUser} = useAuth()
//     console.log('user in profile', user?.email, user?.name, isFetchingUser);
    
//     const form =  useForm<UserUpdateForm>({
//         resolver: zodResolver(userUpdateSchema),
//         defaultValues: {
//             email: "",
//             name: "",
//             address: "",
//             city: ""
//           },
//     })

//     useEffect(() => {
//         if (user) {
//           form.reset({
//             email: user.email || "",
//             name: user.name || "",
//             // city: user.city || "",
//             // address: user.address || "",
//           });
//         }
//       }, [user, form]);

//       if (isFetchingUser) {
//         return (
//           <div className="flex items-center justify-center min-h-screen">
//             <Spinner />
//           </div>
//         );
//       }

//     return (
//         <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 rounded-lg bg-gray-50 md:p-10">
//                 <div>
//                     <h2 className="text-2xl font-bold">User Profile Form</h2>
//                     <FormDescription>
//                         View and change your profile information here 
//                     </FormDescription>

//                 <FormField control={form.control} name="email" render={({field})=> (
//                     <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white" disabled />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )} />
//                 <FormField control={form.control} name="name" render={({field})=> (
//                     <FormItem>
//                         <FormLabel>Name</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white" />
//                         </FormControl>
//                         <FormMessage  />
//                     </FormItem>
//                 )} />
//                 <FormField control={form.control} name="city" render={({field})=> (
//                     <FormItem>
//                         <FormLabel>City</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white" />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )} />
//                 <FormField control={form.control} name="address" render={({field})=> (
//                     <FormItem>
//                         <FormLabel>Address</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white" />
//                         </FormControl>
//                         <FormMessage />
//                     </FormItem>
//                 )} />
//                 {isLoading ? <Spinner /> : <Button type="submit" className="bg-orange-500">Submit</Button>}
//                 </div>
//             </form>
            
//         </Form>
//     )
// }


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Spinner } from "../Spinner";
import { Button } from "../ui/button";
import useProfile from "@/hooks/use-profile";
import { useEffect } from "react";

const userUpdateSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required").max(255, "Name must be less than 255 characters"),
    city: z.string().max(100, "City must be less than 100 characters").optional(),
    address: z.string().max(255, "Address must be less than 255 characters").optional()
});

type UserUpdateForm = z.infer<typeof userUpdateSchema>;

export default function UserProfileForm() {
    const {
        formData,
        isLoading,
        isFetchingUser,
        handleInputChange,
        handleSave,
        error,
        isError
    } = useProfile();

    const form = useForm<UserUpdateForm>({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: formData
    });


    console.log('ERROR', error);
    

    // Sync form with useProfile formData
    useEffect(() => {
        form.reset(formData);
    }, [formData, form]);

    if (isFetchingUser) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4 rounded-lg bg-gray-50 md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>View and change your profile information here</FormDescription>

                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="bg-white"
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="bg-white"
                                    onChange={(e) => handleInputChange("city", e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="bg-white"
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {isError && <div className="text-red-500">Error updating profile: {error && (<p>Error</p>)}</div>}

                    {isLoading ? <Spinner /> : <Button type="submit" className="mt-10 bg-orange-500">Submit</Button>}
                </div>
            </form>
        </Form>
    );
}
