import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import { UserContext } from "../UserContext";
import User from "../interfaces/User";
import AllPosts from "./AllPosts";
import AdvanceCheckbox from "./AdvancedCheckbox";

const departments_data = [
    {
        department: "customer_service",
        sub_departments: ["support", "customer_success"],
    },
    {
        department: "design",
        sub_departments: ["graphic_design", "product_design", "web_design"],
    },
];

export default function Home() {
    const [redirect, setRedirect] = useState<boolean>(false);
    const [redirecting, setRedirecting] = useState<boolean>(false);

    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const value: string | null = localStorage.getItem("user");
        if (!value) {
            return setRedirecting(true);
        }
        const user: User = JSON.parse(value ?? "");

        if (userContext) {
            userContext.setUser({
                ...user,
            });
        }
    }, [userContext]);

    useEffect(() => {
        if (!redirecting) {
            return;
        }
        const i = setTimeout(() => {
            setRedirect(true);
        }, 2000);
        return () => clearTimeout(i);
    }, [redirecting]);

    useEffect(() => {
        if (redirect) {
            navigate("/register");
        }
    }, [redirect, navigate]);

    if (redirecting || !userContext?.user) {
        return (
            <Container sx={{ my: 2}}>
                <Typography variant="h5">
                    You need to register to access this page.
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ my: 2 }}>
            <Typography variant="h4">
                Welcome, {userContext?.user?.name}
            </Typography>
            <AllPosts />

            {departments_data.map((department) => (
                <AdvanceCheckbox
                    childCheckboxes={department.sub_departments}
                    parent={department.department}
                />
            ))}
        </Container>
    );
}
