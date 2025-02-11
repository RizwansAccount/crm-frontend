import { useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../redux/storeApis";

export function useUserDataManager(user_id) {
    const { data, refetch: refetchUser } = useGetCurrentUserQuery();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (data) { setCurrentUser(data?.data); };
    }, [data]);

    useEffect(() => { refetchUser(); }, [user_id]);

    return {
        currentUser
    };
};