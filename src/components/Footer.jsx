import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import {
    Box,
    Container,
    Grid,
    Typography,
    IconButton,
    Link,
    Stack
} from "@mui/material";

import StorefrontIcon from "@mui/icons-material/Storefront";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function Footer() {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    useEffect(() => {
        const syncUser = () => {
            setUser(JSON.parse(localStorage.getItem("user") || "null"));
        };

        // listen custom event
        window.addEventListener("userChanged", syncUser);

        // initial load
        syncUser();

        return () => {
            window.removeEventListener("userChanged", syncUser);
        };
    }, []);


    return (
        <Box
            component="footer"
            sx={{
                bgcolor: "#111827",
                color: "#fff",
                mt: "none"
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    px: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                        lg: 5
                    }
                }}
            >

                <Grid
                    container
                    spacing={{
                        xs: 4,
                        sm: 4,
                        md: 5
                    }}
                    sx={{
                        py: {
                            xs: 4,
                            sm: 5,
                            md: 6
                        }
                    }}
                >

                    {/* COMPANY */}
                    <Grid item xs={12} sm={6} md={3}>

                        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                            <StorefrontIcon />
                            <Typography variant="h5" fontWeight="bold">
                                Smart Store
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body2"
                            sx={{
                                color: "#d1d5db",
                                lineHeight: 1.8
                            }}
                        >
                            Your one-stop destination for electronics, fashion, beauty,
                            groceries, furniture and more.
                        </Typography>

                    </Grid>

                    {/* QUICK LINKS (UPDATED) */}
                    <Grid item xs={6} sm={6} md={3}>

                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Quick Links
                        </Typography>

                        <Stack spacing={1}>

                            {/* Always */}
                            <Link
                                component={RouterLink}
                                to="/"
                                underline="none"
                                sx={{
                                    color: "#d1d5db",
                                    transition: "0.3s",
                                    "&:hover": { color: "#fff", pl: 1 }
                                }}
                            >
                                Home
                            </Link>

                            {/* Public only */}
                            {!user && (
                                <>
                                    <Link
                                        component={RouterLink}
                                        to="/login"
                                        underline="none"
                                        sx={{
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                            "&:hover": { color: "#fff", pl: 1 }
                                        }}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        component={RouterLink}
                                        to="/reg"
                                        underline="none"
                                        sx={{
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                            "&:hover": { color: "#fff", pl: 1 }
                                        }}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}

                            {/* Private only */}
                            {user && (
                                <>
                                    <Link
                                        component={RouterLink}
                                        to={`/${user.username}/home`}
                                        underline="none"
                                        sx={{
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                            "&:hover": { color: "#fff", pl: 1 }
                                        }}
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        component={RouterLink}
                                        to={`/${user.username}/collections`}
                                        underline="none"
                                        sx={{
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                            "&:hover": { color: "#fff", pl: 1 }
                                        }}
                                    >
                                        Collections
                                    </Link>

                                    <Link
                                        component={RouterLink}
                                        to={`/${user.username}/cart`}
                                        underline="none"
                                        sx={{
                                            color: "#d1d5db",
                                            transition: "0.3s",
                                            "&:hover": { color: "#fff", pl: 1 }
                                        }}
                                    >
                                        Cart
                                    </Link>
                                </>
                            )}

                        </Stack>

                    </Grid>

                    {/* CATEGORIES */}
                    <Grid item xs={6} sm={6} md={3}>

                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Categories
                        </Typography>

                        <Stack spacing={1}>
                            <Typography color="#d1d5db">Smartphones</Typography>
                            <Typography color="#d1d5db">Laptops</Typography>
                            <Typography color="#d1d5db">Beauty</Typography>
                            <Typography color="#d1d5db">Furniture</Typography>
                            <Typography color="#d1d5db">Groceries</Typography>
                        </Stack>

                    </Grid>

                    {/* CONTACT */}
                    <Grid item xs={12} sm={6} md={3}>

                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Contact Us
                        </Typography>

                        <Stack spacing={1.5}>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <EmailIcon fontSize="small" />
                                <Typography variant="body2">
                                    support@smartstore.com
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <PhoneIcon fontSize="small" />
                                <Typography variant="body2">
                                    +91 9876543210
                                </Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body2">
                                    Hyderabad, India
                                </Typography>
                            </Box>

                        </Stack>

                        {/* SOCIAL ICONS */}
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>

                            {[FacebookIcon, InstagramIcon, XIcon, LinkedInIcon].map((Icon, i) => (
                                <IconButton
                                    key={i}
                                    sx={{
                                        color: "#fff",
                                        transition: "0.3s",
                                        "&:hover": {
                                            transform: "translateY(-3px)"
                                        }
                                    }}
                                >
                                    <Icon />
                                </IconButton>
                            ))}

                        </Stack>

                    </Grid>

                </Grid>

                {/* COPYRIGHT */}
                <Box
                    sx={{
                        borderTop: "1px solid rgba(255,255,255,0.15)",
                        py: 2,
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#9ca3af",
                            fontSize: {
                                xs: "0.75rem",
                                sm: "0.85rem",
                                md: "0.9rem"
                            }
                        }}
                    >
                        © 2026 Smart Store. All Rights Reserved.
                    </Typography>
                </Box>

            </Container>
        </Box>
    );
}

export default Footer;