import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/CartSlice';

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

function Search() {

    const { username } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const urlQuery = searchParams.get("q");

    const [query, setQuery] = useState(urlQuery || "");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (urlQuery) {
            fetchProducts(urlQuery);
        }
    }, [urlQuery]);

    const fetchProducts = async (searchText) => {
        if (!searchText.trim()) return;

        setLoading(true);

        try {
            const res = await fetch(
                `https://dummyjson.com/products/search?q=${searchText}`
            );

            const data = await res.json();
            setProducts(data.products);

        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

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
        <Box sx={{ background: "#0B1220", minHeight: "100vh", py: 2, mt: 8}}>
            <Container maxWidth="xl">

                {/* PAGE TITLE */}
                <Typography
                    sx={{
                        color: "#fff",
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: "1.1rem", sm: "1.6rem" }
                    }}
                >
                    <i className={"fa-solid fa-magnifying-glass"}></i> Search Products
                </Typography>

                {/* EMPTY STATE */}
                {!loading && products.length === 0 && query && (
                    <Typography sx={{ color: "#9CA3AF" }}>
                        No products found
                    </Typography>
                )}

                {/* CATEGORY-LIKE BLOCK */}
                <Paper
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
                            fontWeight: 600,
                            mb: 1,
                            textTransform: "capitalize"
                        }}
                    >
                        Results for: {query}
                    </Typography>

                    <Grid container spacing={2}>
                        {products.map((p) => (
                            <Grid
                                item
                                xs={6}
                                sm={4}
                                md={3}
                                lg={2}
                                key={p.id}
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
                                            src={p.thumbnail}
                                            alt={p.title}
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
                                            {p.title}
                                        </Typography>

                                        <Typography sx={{ fontSize: "0.75rem", color: "#FACC15" }}>
                                            ₹{p.price}
                                        </Typography>

                                        <Typography sx={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
                                            ⭐ {p.rating}
                                        </Typography>
                                    </Box>

                                    {/* BUTTONS */}
                                    <Stack spacing={0.5} sx={{ p: 1, pt: 0 }}>
                                        <Link
                                            to={`/${username}/product/${p.id}`}
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
                                            onClick={() => dispatch(addToCart(p))}
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

            </Container>
        </Box>
    );
}

export default Search;