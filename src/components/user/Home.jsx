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

function Home() {
    const { username } = useParams();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const categoryResponse = await axios.get(
                    "https://dummyjson.com/products/category-list"
                );

                const cats = categoryResponse.data;

                const shuffled = [...cats].sort(() => Math.random() - 0.5);
                const selectedCategories = shuffled.slice(0, 6);

                setCategories(selectedCategories);

                const temp = {};

                for (const cat of selectedCategories) {
                    const productResponse = await axios.get(
                        `https://dummyjson.com/products/category/${cat}`
                    );

                    temp[cat] = productResponse.data.products.slice(0, 5);
                }

                setProductsByCategory(temp);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    /* ================= LOADING ================= */
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
                    <i className={"fa-solid fa-box"}></i> Products
                </Typography>

                {categories.map((cat) => (
                    <Paper
                        key={cat}
                        sx={{
                            mb: 2,
                            p: 1.5,
                            background: "#0F172A",
                            borderRadius: 2
                        }}
                    >
                        {/* CATEGORY TITLE */}
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

                        {/* 🔥 DENSE GRID (IMPORTANT CHANGE) */}
                        <Grid container spacing={2}>
                            {productsByCategory[cat]?.map((product) => (
                                <Grid 
                                    item
                                    xs={2}     // 2 per row (mobile)
                                    sm={3}     // 3 per row
                                    md={4}     // 4 per row
                                    lg={5}     // 6 per row (NO WASTE SPACE)
                                    key={product.id}
                                >
                                    <Card
                                        sx={{
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
                                        }}
                                    >
                                        {/* IMAGE */}
                                        <Box
                                            sx={{
                                                height: {lg:"250px", md:"200px", sm:"150px"},
                                                overflow: "hidden",
                                                background: "#0B1220"
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={product.thumbnail}
                                                alt={product.title}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </Box>

                                        {/* CONTENT */}
                                        <Box
                                            sx={{
                                                flexGrow: 1,
                                                p: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 0.5
                                            }}
                                        >
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

                                        {/* BUTTONS */}
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
                                                onClick={() =>
                                                    dispatch(addToCart(product))
                                                }
                                                startIcon={
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                }
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
                ))}
            </Container>
        </Box>
    );
}

export default Home;