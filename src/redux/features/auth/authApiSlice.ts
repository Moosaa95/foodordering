import { toast } from "sonner";
import {apiSlice} from "../../services/apiSlice"; // Make sure this import path is correct
import { setAuth } from "./authSlice";
import { RegisterArgs, RegisterResponse, retrieveUserProps, User, UserProfileResponse } from "@/types";



// export interface UserProfileArgs {
//     email: string;
//     country?: string;
//     city?: string;
//     address?: string;
//     name: string;

// }



const API_USER_ENDPOINT = "api/users/"
const API_UPDATE_USER_ENDPOINT = "api/update-user"
const LOGIN_ENDPOINT = "api/jwt/create"
const RETRIEVE_USER_ENDPOINT = "api/users/me"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegisterResponse, RegisterArgs>({
            query: (args) => { 
               console.log(args, 'arggss');
                
                return ({
                url: API_USER_ENDPOINT ,
                method: "POST",
                body: {...args},
            })},
            async onQueryStarted(arg, { queryFulfilled }) {
                console.log('heyyy', arg);
                
                try {
                  await queryFulfilled;
                  toast.success('User registered successfully')
                } catch (err) {
                  toast.error('Failed to login');
                }
            }
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: LOGIN_ENDPOINT, 
                method: 'POST',
                body: {email, password}
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(setAuth());
                  console.log('Logged in successfully');
                } catch (err) {
                  console.error('Failed to login');
                }
            }
        }),
        updateUser: builder.mutation<UserProfileResponse, User>({
            query: (args) => { 
               console.log(args, 'arggss');
                
                return ({
                url: API_UPDATE_USER_ENDPOINT ,
                method: "PATCH",
                body: {...args},
            })},
            async onQueryStarted(arg, { queryFulfilled }) {
                console.log('heyyy', arg);
                
                try {
                  await queryFulfilled;
                  toast.success('User profile updated successfully')
                } catch (err) {
                  toast.error('Failed to update');
                }
            }
        }),
        retrieveUser: builder.query<retrieveUserProps, void>({
            query: () => ({
                url: RETRIEVE_USER_ENDPOINT,
                method: 'GET',
                
            }),
            keepUnusedDataFor: 5
        }),

    }),

    overrideExisting: false, // Adjust according to your need
});

export const { useRegisterUserMutation, useLoginMutation, useRetrieveUserQuery, useUpdateUserMutation  } = authApiSlice;
