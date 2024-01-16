import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../UserContext";
import User from "../interfaces/User";

export default function Home() {
    const [redirect, setRedirect] = useState<boolean>(false);

    const userContext = useContext(UserContext);

    useEffect(() => {
        const value: string | null = localStorage.getItem("user");
        if (!value) {
            return setRedirect(true);
        }
        const user: User = JSON.parse(value ?? "");

        if (userContext) {
            userContext.setUser({
                ...user,
            });
        }
    }, [userContext]);

    if (redirect || !userContext?.user) {
        return <Navigate to={"/register"} />;
    }

    return <div>Home page, {userContext?.user?.name}</div>;
}
