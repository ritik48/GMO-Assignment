import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../UserContext";
import { useContext } from "react";
import User from "../interfaces/User";

const defaultTheme = createTheme();

export default function SignUp() {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const userContext = useContext(UserContext);

    const [redirect, setRedirect] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const value: string | null = localStorage.getItem("user");

        if (value) {
            setRedirect(true);
        }
    }, []);

    const handleSubmit = (): void => {
        if ([name, email, phone].some((value) => !value)) {
            return setError("Make sure every field is filled.");
        }

        const user: User = { email, name, phone };
        localStorage.setItem("user", JSON.stringify(user));

        if (userContext) {
            userContext.setUser({
                name,
                email,
                phone,
            });
        }
        setRedirect(true);
    };

    if (redirect || userContext?.user) {
        return <Navigate to={"/"} />;
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{ mt: -10 }}>
                {error && <Alert severity="error">{error}</Alert>}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone((prevValue) => {
                                            const newValue =
                                                e.target.value.trim();
                                            return isNaN(Number(newValue))
                                                ? prevValue
                                                : newValue;
                                        });
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </Button>
                        {/* <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                localStorage.setItem("user", "");
                            }}
                        >
                            Clear
                        </Button> */}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
