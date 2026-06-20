import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Stack
} from "@mui/material";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";

function LandingPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            navigate(`/${user.username}/home`, { replace: true });
        }
    }, [navigate]);

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 140px)",
                mt: 8
            }}
        >

            {/* HERO SECTION */}

            <Box
                sx={{
                    minHeight: {
                        xs: "80vh",
                        sm: "85vh",
                        md: "90vh"
                    },
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.6)"
                    }}
                />

                <Container
                    maxWidth="xl"
                    sx={{
                        position: "relative",
                        zIndex: 2
                    }}
                >

                    <Box
                        sx={{
                            maxWidth: "700px"
                        }}
                    >

                        <Typography
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 2,
                                fontSize: {
                                    xs: "2rem",
                                    sm: "3rem",
                                    md: "4rem",
                                    lg: "5rem"
                                }
                            }}
                        >
                            Discover Amazing
                            Products For Every
                            Lifestyle
                        </Typography>

                        <Typography
                            sx={{
                                color: "#f5f5f5",
                                mb: 4,
                                maxWidth: "600px",
                                fontSize: {
                                    xs: "1rem",
                                    md: "1.2rem"
                                }
                            }}
                        >
                            Shop the latest fashion,
                            electronics, beauty,
                            groceries and much more.
                            Enjoy secure payments,
                            fast delivery and exclusive
                            deals every day.
                        </Typography>

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={2}
                        >

                            <Button
                                variant="contained"
                                size="large"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Shop Now
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() =>
                                    navigate("/login")
                                }
                                sx={{
                                    color: "#fff",
                                    borderColor: "#fff",
                                    "&:hover": {
                                        borderColor: "#fff"
                                    }
                                }}
                            >
                                Explore More
                            </Button>

                        </Stack>

                    </Box>

                </Container>

            </Box>

            {/* FEATURES SECTION */}

            <Container
                maxWidth="xl"
                sx={{
                    py: {
                        xs: 5,
                        md: 8
                    }
                }}
            >

                <Typography
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    sx={{
                        fontSize: {
                            xs: "2rem",
                            sm: "2.5rem",
                            md: "3rem"
                        },
                        marginBottom: "30px",
                        color: "white"
                    }}
                >
                    Why Choose Smart Store?
                </Typography>

                <Grid
                    container
                    spacing={{
                        xs: 2,
                        sm: 3,
                        md: 4
                    }}
                    alignItems="stretch"
                >

                    {/* CARD 1 */}

                    <Grid item xs={12} sm={6} md={4}>

                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                textAlign: "center",
                                transition: "0.3s",
                                "&:hover": {
                                    transform:
                                        "translateY(-8px)",
                                    boxShadow: 6
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 3,
                                        md: 4
                                    }
                                }}
                            >

                                <ShoppingBagIcon
                                    sx={{
                                        fontSize: {
                                            xs: 55,
                                            md: 70
                                        },
                                        mb: 2
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    Premium Products
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8
                                    }}
                                >
                                    Carefully selected
                                    quality products from
                                    trusted brands across
                                    multiple categories.
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    {/* CARD 2 */}

                    <Grid item xs={12} sm={6} md={4}>

                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                textAlign: "center",
                                transition: "0.3s",
                                "&:hover": {
                                    transform:
                                        "translateY(-8px)",
                                    boxShadow: 6
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 3,
                                        md: 4
                                    }
                                }}
                            >

                                <LocalShippingIcon
                                    sx={{
                                        fontSize: {
                                            xs: 55,
                                            md: 70
                                        },
                                        mb: 2
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    Fast Delivery
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8
                                    }}
                                >
                                    Quick and reliable
                                    shipping with real-time
                                    order tracking and
                                    doorstep delivery.
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                    {/* CARD 3 */}

                    <Grid item xs={12} sm={6} md={4}>

                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                textAlign: "center",
                                transition: "0.3s",
                                "&:hover": {
                                    transform:
                                        "translateY(-8px)",
                                    boxShadow: 6
                                }
                            }}
                        >

                            <CardContent
                                sx={{
                                    p: {
                                        xs: 3,
                                        md: 4
                                    }
                                }}
                            >

                                <SecurityIcon
                                    sx={{
                                        fontSize: {
                                            xs: 55,
                                            md: 70
                                        },
                                        mb: 2
                                    }}
                                />

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    Secure Payments
                                </Typography>

                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        lineHeight: 1.8
                                    }}
                                >
                                    Multiple secure payment
                                    options with advanced
                                    encryption and customer
                                    protection.
                                </Typography>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            </Container>

        </Box>
    );
}

export default LandingPage;