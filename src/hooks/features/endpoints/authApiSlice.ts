import {apiSlice} from "../../services/apiSlice"; // Make sure this import path is correct

export interface RegisterArgs {
    auth0Id: string;
    email: string;
    country?: string;
    city?: string;
    name: string;
}

// Define response type if necessary
interface RegisterResponse {
    success: boolean;
    message?: string;
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterResponse, RegisterArgs>({
            query: (args) => { 
               console.log(args, 'arggss');
                
                return ({
                url: "/account/users/",
                method: "POST",
                body: {...args},
            })},
        }),
    }),
    // Adding tagTypes and endpoints to the slice if needed for cache management
    overrideExisting: false, // Adjust according to your need
});

export const { useRegisterUserMutation  } = authApiSlice;
