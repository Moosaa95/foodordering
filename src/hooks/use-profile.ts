import { useRetrieveUserQuery, useUpdateUserMutation } from "@/redux/features/auth/authApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { User } from "@/types";
import { toast } from "sonner";

export default function useProfile() {
    const { user, isFetchingUser } = useAuth();
    const [updateUser, { isLoading, isSuccess, isError, error }] = useUpdateUserMutation();
    const { refetch } = useRetrieveUserQuery(undefined, {
        skip: true  // Skip automatic fetching to control it manually
    });
    const navigate = useNavigate();

    const [formData, setFormData] = useState<User>({
        name: "",
        email: "",
        address: "",
        city: "",
        country: ""
    });

    // Update formData when the user data is available
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                address: user.address || "",
                city: user.city || "",
                country: user.country || ""
            });
        }
    }, [user]);

    const handleInputChange = (field: keyof User, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const handleSave = async () => {
        try {
            await updateUser(formData).unwrap();
            if (isSuccess) {
                await refetch();  // This refetches the updated user data
                toast.success('Profile updated successfully');
                navigate("/profile");
            }
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    return {
        formData,
        isLoading,
        isFetchingUser,
        handleInputChange,
        handleSave,
        error,
        isError
    };
}
