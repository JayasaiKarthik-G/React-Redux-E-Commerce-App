import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Badge,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Box,
    TextField,
    Menu,
    MenuItem
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import CollectionsIcon from "@mui/icons-material/Collections";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import API_URL from "../api";
import { ListItemIcon } from "@mui/material";

function NavBar() {

    const navigate = useNavigate();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    const cartCount = useSelector(state =>
        state.cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    );

    useEffect(() => {

        const syncUser = () => {
            setUser(JSON.parse(localStorage.getItem("user") || "null"));
        };

        window.addEventListener("userChanged", syncUser);

        syncUser();

        return () => {
            window.removeEventListener("userChanged", syncUser);
        };

    }, []);

    const handleSearch = () => {
        if (!search.trim() || !user) return;

        navigate(`/${user.username}/search?q=${search}`);
        setSearch("");
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userChanged"));
        setAnchorEl(null);
        setDrawerOpen(false);
        navigate("/login", { replace: true });
    };

    const handleDeleteAccount = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (!userData) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/users/${userData.id}`);

            localStorage.removeItem("user");
            window.dispatchEvent(new Event("userChanged"));

            setAnchorEl(null);
            setDrawerOpen(false);

            navigate("/reg", { replace: true });

            alert("Account deleted successfully");
        } catch (error) {
            console.log(error);
            alert("Delete failed");
        }
    };

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    top: 0,
                    zIndex: 1200,
                    backgroundColor: "#0B1220",
                    color: "#F9FAFB",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: { xs: 56, sm: 64 },
                        px: { xs: 1, sm: 2, md: 4 },
                        gap: 1
                    }}
                >

                    {/* MOBILE MENU */}
                    <IconButton
                        size="small"
                        sx={{
                            display: { xs: "flex", md: "none" },
                            color: "#F3F4F6"
                        }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* LOGO */}
                    <Typography
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "#F9FAFB",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexGrow: 1,
                            fontSize: {
                                xs: "0.9rem",
                                sm: "1rem",
                                md: "1.2rem"
                            }
                        }}
                    >
                        <StorefrontIcon fontSize="small" />
                        Smart Store
                    </Typography>

                    {/* LOGIN / REGISTER */}
                    {!user ? (
                        <Box
                            sx={{
                                display: { xs: "none", sm: "flex", md: "flex" },
                                gap: { xs: 0.5, sm: 1 }
                            }}
                        >
                            <Button size="small" component={Link} to="/" 
                            startIcon={<HomeIcon/>} sx={{ color: "#E5E7EB" }}>
                                Home
                            </Button>
                            <Button size="small" component={Link} to="/login" 
                            startIcon={<LoginIcon/>} sx={{ color: "#E5E7EB" }}>
                                Login
                            </Button>
                            <Button size="small" component={Link} to="/reg" 
                            startIcon={<PersonAddIcon/>} sx={{ color: "#E5E7EB" }}>
                                Register
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, mr: 2 }}>
                                <Button component={Link} to={`/${user.username}/home`} 
                                    startIcon={<HomeIcon />} sx={{ color: "#E5E7EB" }}>
                                    Home
                                </Button>
                                <Button component={Link} to={`/${user.username}/collections`} 
                                    startIcon={<CollectionsIcon />} sx={{ color: "#E5E7EB" }}>
                                    Collections
                                </Button>
                            </Box>

                            {/* SEARCH */}
                            <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", mr: 1 }}>
                                <TextField
                                    size="small"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                        width: { sm: 160, md: 250, lg: 320 },
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor: "#111827",
                                            color: "#F9FAFB",
                                            "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
                                            "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                            "&.Mui-focused fieldset": { borderColor: "#3B82F6" }
                                        }
                                    }}
                                />
                                <IconButton onClick={handleSearch} sx={{ color: "#F3F4F6" }}>
                                    <SearchIcon />
                                </IconButton>
                            </Box>

                            {/* CART */}
                            <IconButton
                                component={Link}
                                to={`/${user.username}/cart`}
                                sx={{ color: "#F3F4F6" }}
                            >
                                <Badge badgeContent={cartCount} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>

                            {/* PROFILE */}
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: "#F3F4F6" }}>
                                <AccountCircleIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                PaperProps={{
                                    sx: { backgroundColor: "#0B1220", color: "#313131" }
                                }}
                            >
                                <MenuItem
                                    disabled
                                    sx={{
                                        color: "#06B6D4",
                                        opacity: 1,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {user.username}
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <LogoutIcon sx={{ mr: 1 }} />Logout
                                </MenuItem>
                                <MenuItem
                                    onClick={handleDeleteAccount}
                                    sx={{ color: "#F87171" }}
                                >
                                    <DeleteIcon sx={{ mr: 1 }} />
                                    Delete Account
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            
            {/* ================= MOBILE DRAWER (FIXED + FULL MENU) ================= */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        width: 240,
                        backgroundColor: "#0B1220",
                        height: "100%",
                        color: "#fff"
                    }}
                >

                    {!user ? (

                        <List>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to="/"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <ListItemIcon>
                                        <HomeIcon sx={{ color: "#E5E7EB" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to="/login"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <ListItemIcon>
                                        <LoginIcon sx={{ color: "#E5E7EB" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton
                                    component={Link}
                                    to="/reg"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    <ListItemIcon>
                                        <PersonAddIcon sx={{ color: "#E5E7EB" }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Register" />
                                </ListItemButton>
                            </ListItem>

                        </List>

                    ) : (

                        <>
                            <Box sx={{ p: 2 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search Products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                        backgroundColor: "#111827",
                                        borderRadius: 1,
                                        "& .MuiOutlinedInput-root": {
                                            color: "#fff"
                                        }
                                    }}
                                />

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 1, backgroundColor: "#2563EB" }}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </Box>

                            <List>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={`/${user?.username}/home`}
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        <ListItemIcon>
                                            <HomeIcon sx={{ color: "#E5E7EB" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={`/${user?.username}/collections`}
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        <ListItemIcon>
                                            <CollectionsIcon sx={{ color: "#E5E7EB" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Collections" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={`/${user?.username}/cart`}
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        <ListItemIcon>
                                            <ShoppingCartIcon sx={{ color: "#E5E7EB" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={`Cart (${cartCount})`} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon sx={{ color: "#E5E7EB" }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>

                            </List>
                        </>

                    )}

                </Box>
            </Drawer>
        </>
    );
}

export default NavBar;