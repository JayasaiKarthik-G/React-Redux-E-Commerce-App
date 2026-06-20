import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Stack
} from "@mui/material";

import API_URL from "../api";

import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            navigate(`/${user.username}/home`, { replace: true });
        }
    }, [navigate]);

    async function handleLogin(event) {
        event.preventDefault();

        if (!emailOrUsername || !password) {
            alert("Please fill all details");
            return;
        }

        try {
            const response = await axios.get(`${API_URL}/users`);

            const user = response.data.find(
                (u) =>
                    (u.email === emailOrUsername ||
                        u.username === emailOrUsername) &&
                    u.password === password
            );

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                
                window.dispatchEvent(new Event("userChanged"));

                alert("Login Successful");
                navigate(`/${user.username}/home`, { replace: true });
            
            } else {
                alert("Invalid Email or Password");
            }
        } catch (error) {
            console.log(error);
            alert("Login Failed");
        }
    }

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            backgroundColor: "#0B1220",
            borderRadius: 2,

            "& fieldset": {
                borderColor: "rgba(255,255,255,0.15)"
            },

            "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.3)"
            },

            "&.Mui-focused fieldset": {
                borderColor: "#3B82F6"
            }
        },

        "& input": {
            color: "#fff"
        },

        "& .MuiInputAdornment-root svg": {
            color: "#9CA3AF"
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#0B1220",
                mt: 6
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: { xs: 2, sm: 3 }
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={6}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 3,
                            backgroundColor: "#111827",
                            color: "#fff"
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            textAlign="center"
                            sx={{
                                mb: 3,
                                fontSize: { xs: "1.3rem", sm: "1.6rem" }
                            }}
                        >
                            Login
                        </Typography>

                        <form onSubmit={handleLogin}>
                            <Stack spacing={2.2}>

                                {/* EMAIL / USERNAME */}
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Email or Username"
                                    value={emailOrUsername}
                                    onChange={(e) => setEmailOrUsername(e.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={inputSx}
                                />

                                {/* PASSWORD */}
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LockIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    sx={inputSx}
                                />

                                {/* BUTTON */}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        py: 1.2,
                                        fontWeight: 600,
                                        backgroundColor: "#2563EB",
                                        fontSize: { xs: "0.85rem", sm: "0.95rem" },
                                        "&:hover": {
                                            backgroundColor: "#1D4ED8"
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>

                        <Typography
                            textAlign="center"
                            mt={2}
                            sx={{
                                color: "#9CA3AF",
                                fontSize: { xs: "0.8rem", sm: "0.9rem" },
                                mt: 3
                            }}
                        >
                            New User?{" "}
                            <Link
                                to="/reg"
                                style={{
                                    color: "#60A5FA",
                                    textDecoration: "none"
                                }}
                            >
                                Register Here
                            </Link>
                        </Typography>
                    </Paper>
                </Container>
            </Box>

            <Box component="footer" />
        </Box>
    );
}

export default Login;