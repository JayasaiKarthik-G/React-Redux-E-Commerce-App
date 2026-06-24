import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Stack,
    InputAdornment
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { Link, useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            navigate(`/${user.username}/home`, {replace: true});
        }
    }, [navigate]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (
            !name ||
            !username ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Please fill all the details.");
            return;
        }

        const namePattern = /^[A-Za-z ]{3,30}$/;
        const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
        const emailPattern = /^[a-z0-9._-]{3,30}@gmail[.]com$/;
        const passwordPattern =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).{8,30}$/;

        if (!namePattern.test(name)) return alert("Invalid name");
        if (!usernamePattern.test(username)) return alert("Invalid username");
        if (!emailPattern.test(email)) return alert("Invalid email");
        if (!passwordPattern.test(password)) return alert("Weak password");
        if (password !== confirmPassword)
            return alert("Passwords do not match");

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.find(
            (u) =>
                u.email === email ||
                u.username === username
        );

        if (exists) {
            alert("Email or Username already registered");
            return;
        }

        const newId =
            users.length > 0
                ? Math.max(
                    ...users.map(
                        user => Number(user.id)
                    )
                ) + 1
                : 1;

        const obj = {
            id: newId,
            name,
            username,
            email,
            password
        };

        users.push(obj);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration Successful");

        navigate("/login");
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

        // TEXT COLOR (input typing)
        "& input": {
            color: "#F8FAFC",
            fontSize: { xs: "0.85rem", sm: "1rem" }
        },

        // LABEL COLOR (default + focus)
        "& .MuiInputLabel-root": {
            color: "#94A3B8"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "#3B82F6"
        },

        // ICON COLOR (adornment)
        "& .MuiSvgIcon-root": {
            color: "#9CA3AF"
        },

        // AUTOFILL FIX (important in login/register)
        "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px #0B1220 inset",
            WebkitTextFillColor: "#F8FAFC"
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0B1220",
                py: { xs: 3, sm: 3, md: 3 },
                mt: 8
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
                        textAlign="center"
                        fontWeight={700}
                        sx={{
                            mb: 3,
                            fontSize: { xs: "1.3rem", sm: "1.6rem" }
                        }}
                    >
                        Register
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2.2}>

                            {/* NAME */}
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BadgeIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={inputSx}
                            />

                            {/* USERNAME */}
                            <TextField
                                fullWidth
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

                            {/* EMAIL */}
                            <TextField
                                fullWidth
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon sx={{ color: "#9CA3AF", fontSize: 20 }} />
                                            </InputAdornment>
                                        )
                                    }
                                }}
                                sx={inputSx}
                            />

                            {/* PASSWORD */}
                            <TextField
                                fullWidth
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

                            {/* CONFIRM PASSWORD */}
                            <TextField
                                fullWidth
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
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
                                startIcon={<HowToRegIcon />}
                                sx={{
                                    py: 1.2,
                                    fontWeight: 600,
                                    backgroundColor: "#2563EB",
                                    "&:hover": {
                                        backgroundColor: "#1D4ED8"
                                    }
                                }}
                            >
                                Register
                            </Button>
                        </Stack>
                    </form>

                    <Typography
                        textAlign="center"
                        mt={3}
                        sx={{
                            color: "#9CA3AF",
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            mt: 3
                        }}
                    >
                        Already registered?{" "}
                        <Link
                            to="/login"
                            style={{
                                color: "#60A5FA",
                                textDecoration: "none"
                            }}
                        >
                            Login Here
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default Register;