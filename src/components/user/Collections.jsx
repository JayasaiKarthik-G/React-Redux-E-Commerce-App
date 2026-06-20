import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addToCart } from "../../redux/slices/CartSlice";

import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    Button,
    Stack,
    CircularProgress,
    Paper
} from "@mui/material";

function Collections() {
    const { username } = useParams();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [randomCategories, setRandomCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const categoryRes = await axios.get(
                    "https://dummyjson.com/products/category-list"
                );

                const cats = categoryRes.data;

                setCategories(cats);

                const shuffled = [...cats].sort(() => Math.random() - 0.5);
                setRandomCategories(shuffled.slice(0, 6));

                const tempData = {};

                for (const cat of cats) {
                    const productRes = await axios.get(
                        `https://dummyjson.com/products/category/${cat}`
                    );

                    tempData[cat] = productRes.data.products;
                }

                setProductsByCategory(tempData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    /* ================= LOADING (MATCH HOME) ================= */
    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0B1220"
                }}
            >
                <CircularProgress sx={{ color: "#60A5FA" }} />
            </Box>
        );
    }

    /* ================= CARD STYLE (EXACT HOME MATCH) ================= */
    const cardStyle = {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "#fff",
        borderRadius: 2,
        boxShadow: "0 0 5px black",
        "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 12px 30px rgba(37,99,235,0.25)"
        }
    };

    const imageBox = {
        height: 250,
        overflow: "hidden",
        background: "#0B1220"
    };

    const imgStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    };

    return (
        <Box sx={{ background: "#0B1220", minHeight: "100vh", py: 2, mt: 8 }}>
            <Container maxWidth="xl">

                <Typography
                    sx={{
                        color: "#fff",
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.1rem", sm: "1.6rem" }
                    }}
                >
                    <i className={"fa-solid fa-layer-group"}></i> Collections
                </Typography>

                {/* CATEGORY BUTTONS */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSelectedCategory("")}
                        sx={{ color: "#60A5FA", borderColor: "#334155" }}
                    >
                        All
                    </Button>

                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            size="small"
                            onClick={() => setSelectedCategory(cat)}
                            sx={{
                                color: "#93C5FD",
                                border: "1px solid #1F2937"
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </Box>

                {/* ================= SINGLE CATEGORY VIEW ================= */}
                {selectedCategory ? (
                    <Paper sx={{ p: 2, background: "#0F172A", borderRadius: 2 }}>
                        <Typography
                            sx={{
                                color: "#93C5FD",
                                textTransform: "capitalize",
                                fontWeight: 600,
                                mb: 2
                            }}
                        >
                            {selectedCategory}
                        </Typography>

                        <Grid container spacing={2}>
                            {productsByCategory[selectedCategory]?.map((product) => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                                    <Card sx={cardStyle}>
                                        <Box sx={imageBox}>
                                            <Box
                                                component="img"
                                                src={product.thumbnail}
                                                sx={imgStyle}
                                            />
                                        </Box>

                                        <Box sx={{ flexGrow: 1, p: 1 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "0.8rem",
                                                    fontWeight: 600,
                                                    lineHeight: 1.2,
                                                    height: 35,
                                                    overflow: "hidden"
                                                }}
                                            >
                                                {product.title}
                                            </Typography>

                                            <Typography sx={{ fontSize: "0.75rem", color: "#FACC15" }}>
                                                ₹{product.price}
                                            </Typography>

                                            <Typography sx={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
                                                ⭐ {product.rating}
                                            </Typography>
                                        </Box>

                                        <Stack spacing={0.5} sx={{ p: 1, pt: 0 }}>
                                            <Link
                                                to={`/${username}/product/${product.id}`}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <Button
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    startIcon={
                                                        <i className="fa-solid fa-eye"></i>
                                                    }
                                                    sx={{
                                                        color: "#60A5FA",
                                                        borderColor: "#334155",
                                                        fontSize: "0.65rem"
                                                    }}
                                                >
                                                    View Product
                                                </Button>
                                            </Link>

                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="contained"
                                                startIcon={
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                }
                                                onClick={() => dispatch(addToCart(product))}
                                                sx={{
                                                    background: "#2563EB",
                                                    fontSize: "0.65rem"
                                                }}
                                            >
                                                Add To Cart
                                            </Button>
                                        </Stack>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                ) : (
                    /* ================= DEFAULT VIEW (MATCH HOME EXACTLY) ================= */
                    randomCategories.map((cat) => (
                        <Paper
                            key={cat}
                            sx={{
                                mb: 2,
                                p: 1.5,
                                background: "#0F172A",
                                borderRadius: 2
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#93C5FD",
                                    textTransform: "capitalize",
                                    fontWeight: 600,
                                    mb: 1
                                }}
                            >
                                {cat}
                            </Typography>

                            <Grid container spacing={2}>
                                {productsByCategory[cat]
                                    ?.slice(0, 5)
                                    .map((product) => (
                                        <Grid item xs={6} sm={4} md={3} lg={2} key={product.id}>
                                            <Card sx={cardStyle}>
                                                <Box sx={imageBox}>
                                                    <Box component="img" src={product.thumbnail} sx={imgStyle} />
                                                </Box>

                                                <Box sx={{ flexGrow: 1, p: 1 }}>
                                                    <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                                                        {product.title}
                                                    </Typography>

                                                    <Typography sx={{ fontSize: "0.75rem", color: "#FACC15" }}>
                                                        ₹{product.price}
                                                    </Typography>

                                                    <Typography sx={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
                                                        ⭐ {product.rating}
                                                    </Typography>
                                                </Box>

                                                <Stack spacing={0.5} sx={{ p: 1, pt: 0 }}>
                                                    <Link
                                                        to={`/${username}/product/${product.id}`}
                                                        style={{ textDecoration: "none" }}
                                                    >
                                                        <Button
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={
                                                                <i className="fa-solid fa-eye"></i>
                                                            }
                                                            sx={{
                                                                color: "#60A5FA",
                                                                borderColor: "#334155",
                                                                fontSize: "0.65rem"
                                                            }}
                                                        >
                                                            View Product
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        fullWidth
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={
                                                            <i className="fa-solid fa-cart-plus"></i>
                                                        }
                                                        onClick={() => dispatch(addToCart(product))}
                                                        sx={{
                                                            background: "#2563EB",
                                                            fontSize: "0.65rem"
                                                        }}
                                                    >
                                                        Add To Cart
                                                    </Button>
                                                </Stack>
                                            </Card>
                                        </Grid>
                                    ))}
                            </Grid>
                        </Paper>
                    ))
                )}
            </Container>
        </Box>
    );
}

export default Collections;