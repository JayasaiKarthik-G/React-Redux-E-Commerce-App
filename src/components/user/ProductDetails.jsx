import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addToCart } from "../../redux/slices/CartSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
    Stack,
    CircularProgress,
    Divider
} from "@mui/material";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {

        async function getProduct() {

            try {

                const response = await axios.get(
                    `https://dummyjson.com/products/${id}`
                );

                setProduct(response.data);

                setMainImage(
                    response.data.images?.[0] ||
                    response.data.thumbnail
                );

            } catch (error) {

                console.log(error);

            }

        }

        getProduct();

    }, [id]);

    if (!product) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0B1220",
                }}
            >
                <CircularProgress sx={{ color: "#60A5FA" }} />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                background: "#0B1220",
                minHeight: "100vh",
                py: { xs: 1, sm: 2 },
                mt: 8
            }}
        >
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
                    <i className={"fa-solid fa-tag"}></i> Product Details
                </Typography>

                <Paper
                    sx={{
                        p: { xs: 1.5, sm: 2 },
                        background: "#0F172A",
                        borderRadius: 2

                    }}
                >
                    <Grid
                        container
                        spacing={2}
                    >

                        {/* IMAGE SECTION */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                            
                        >
                            <Paper
                                sx={{
                                    p: 3.5,
                                    background: "#111827",
                                    borderRadius: 2
                                }}
                            >
                                <Box
                                    component="img"
                                    src={mainImage}
                                    alt={product.title}
                                    sx={{
                                        width: "100%",
                                        height: {
                                            xs: 240,
                                            sm: 320,
                                            md: 420,
                                            lg: 500
                                        },
                                        objectFit: "contain",
                                        borderRadius: 2,
                                        background: "#0B1220"
                                    }}
                                />

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    flexWrap="wrap"
                                    sx={{ mt: 2 }}
                                >
                                    {product.images?.map((img, index) => (
                                        <Box
                                            key={index}
                                            component="img"
                                            src={img}
                                            alt=""
                                            onClick={() =>
                                                setMainImage(img)
                                            }
                                            sx={{
                                                width: {
                                                    xs: 60,
                                                    sm: 80
                                                },
                                                height: {
                                                    xs: 60,
                                                    sm: 80
                                                },
                                                objectFit: "cover",
                                                borderRadius: 1,
                                                cursor: "pointer",
                                                border:
                                                    mainImage === img
                                                        ? "2px solid #2563EB"
                                                        : "1px solid #334155"
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Paper>
                        </Grid>

                        {/* DETAILS */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >
                            <Paper
                                sx={{
                                    p: 2,
                                    background: "#111827",
                                    borderRadius: 2,
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700
                                    }}
                                >
                                    {product.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#9CA3AF",
                                        mt: 1
                                    }}
                                >
                                    {product.description}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#FACC15",
                                        fontSize: "2rem",
                                        fontWeight: 700,
                                        mt: 2
                                    }}
                                >
                                    ₹ {product.price}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#22C55E",
                                        fontWeight: 600
                                    }}
                                >
                                    {product.discountPercentage}% OFF
                                </Typography>

                                <Divider
                                    sx={{
                                        my: 2,
                                        borderColor: "#334155",
                                    }}
                                />

                                <Stack spacing={1.2}>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-star" style={{ color: "#FACC15", marginRight: "8px" }}></i>
                                        Rating: {product.rating}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-tag" style={{ marginRight: "8px" }}></i>
                                        Brand: {product.brand}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-layer-group" style={{ marginRight: "8px" }}></i>
                                        Category: {product.category}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-boxes-stacked" style={{ marginRight: "8px" }}></i>
                                        Stock: {product.stock}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-barcode" style={{ marginRight: "8px" }}></i>
                                        SKU: {product.sku}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-weight-hanging" style={{ marginRight: "8px" }}></i>
                                        Weight: {product.weight} g
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-ruler-combined" style={{ marginRight: "8px" }}></i>
                                        Dimensions: {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-truck-fast" style={{ marginRight: "8px" }}></i>
                                        Shipping: {product.shippingInformation}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-shield-halved" style={{ marginRight: "8px" }}></i>
                                        Warranty: {product.warrantyInformation}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-circle-check" style={{ marginRight: "8px", color: "#22C55E" }}></i>
                                        Availability: {product.availabilityStatus}
                                    </Typography>

                                    <Typography sx={{ color: "#E5E7EB", fontSize: "0.9rem" }}>
                                        <i className="fa-solid fa-rotate-left" style={{ marginRight: "8px" }}></i>
                                        Return Policy: {product.returnPolicy}
                                    </Typography>

                                </Stack>

                                <Stack
                                    direction={{
                                        xs: "column",
                                        sm: "row"
                                    }}
                                    spacing={2}
                                    sx={{mt:3}}
                                >
                                    <Button
                                        variant="outlined"
                                        startIcon={<ArrowBackIcon/>}
                                        onClick={() => navigate(-1)}
                                        sx={{
                                            borderColor: "#334155",
                                            color: "#60A5FA"
                                        }}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon/>}
                                        onClick={() => {
                                            dispatch(addToCart(product));
                                            alert("Added To Cart");
                                        }}
                                        sx={{
                                            background: "#2563EB",
                                            "&:hover": {
                                                background: "#1D4ED8"
                                            }
                                        }}
                                    >
                                        Add To Cart
                                    </Button>
                                </Stack>
                            </Paper>
                        </Grid>

                    </Grid>
                </Paper>

                {/* REVIEWS */}

                {product.reviews?.length > 0 && (
                    <Paper
                        sx={{
                            mt: 2,
                            p: 2,
                            background: "#0F172A",
                            borderRadius: 2
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#93C5FD",
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            Customer Reviews
                        </Typography>

                        <Grid
                            container
                            spacing={2}
                        >
                            {product.reviews.map((review, index) => (
                                <Grid
                                    key={index}
                                    size={{
                                        xs: 12,
                                        md: 6
                                    }}
                                >
                                    <Paper
                                        sx={{
                                            p: 2,
                                            background: "#111827",
                                            borderRadius: 2
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "#fff",
                                                fontWeight: 600
                                            }}
                                        >
                                            {review.reviewerName}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#FACC15",
                                                my: 1
                                            }}
                                        >
                                            ⭐ {review.rating}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: "#D1D5DB"
                                            }}
                                        >
                                            {review.comment}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}

            </Container>
        </Box>
    );
}

export default ProductDetails;