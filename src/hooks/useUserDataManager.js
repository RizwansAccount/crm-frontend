import { useEffect, useState } from "react";
import { useGetCurrentUserQuery } from "../redux/storeApis";

export function useUserDataManager() {
    const { data } = useGetCurrentUserQuery();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (data) { setCurrentUser(data?.data); };
    }, [data]);

    return {
        currentUser
    };
};