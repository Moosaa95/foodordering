import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuth0 } from '@auth0/auth0-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// export const useAuthToken = async (): Promise<string | undefined> => {
//   const { getAccessTokenSilently } = useAuth0();
//   try {
//     return await getAccessTokenSilently();
//   } catch (error) {
//     console.error('Failed to get Auth0 access token', error);
//     return undefined;
//   }
// // };
// export function useAuthToken() {
//   const { getAccessTokenSilently } = useAuth0();

//   const getAuthToken = async () => {
//       try {
//           const token = await getAccessTokenSilently();
//           return token;
//       } catch (error) {
//           console.error("Failed to get access token:", error);
//           throw error;
//       }
//   };

//   return getAuthToken;
// }