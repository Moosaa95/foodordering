import { selectIsAuthenticated, selectIsLoading } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks'; // Adjust import according to your setup
import {useRetrieveUserQuery} from '../redux/features/auth/authApiSlice'


interface RetrieveUserProps {
    id: number;
    email: string;
    name: string;
}


export default function useAuth() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isLoading = useAppSelector(selectIsLoading);
    const { data: user, isFetching: isFetchingUser, error: userError } = useRetrieveUserQuery();

    return {
        isAuthenticated,
        isFetchingUser,
        user: user as RetrieveUserProps | undefined,
        userError,
        isLoading,
    };
}