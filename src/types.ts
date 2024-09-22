export type User = {
    id?: string;
    email?: string;
    name?: string;
    address?: string;
    city?: string;
    country?:string;
}

export interface UserProfileResponse {
    success: boolean;
    message?: string;
}

export interface RegisterArgs {
    // auth0_id: string;
    email: string;
    country?: string;
    city?: string;
    address?: string;
    name: string;
    password:string;
    re_password: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

export interface retrieveUserProps {
    id: number;
    email: string;
    name: string;
    city?: string;
    country?: string;
    address?: string;
}