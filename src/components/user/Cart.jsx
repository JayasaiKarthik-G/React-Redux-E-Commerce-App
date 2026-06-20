import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
    removeFromCart,
    increaseQty,
    decreaseQty
} from "../../redux/slices/CartSlice";

import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    Paper
} from "@mui/material";

function Cart() {

    const { username } = useParams();
    const cart = useSelector((state) => state.cart.items);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cart.reduce(
        (sum, item) =>
            sum +
            (item.price / (1 - item.discountPercentage / 100)) *
            item.quantity,
        0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const savings = subtotal - total;

    const handleBuyNow = () => {
        if (cart.length === 0) {
            alert("Cart is Empty");
            return;
        }
        navigate(`/${username}/payment`);
    };

    const cell = (label, value, color = "#fff") => (
        <Box
            sx={{
                flex: 1,
                minWidth: 90,
                textAlign: "center",
                background: "#0B1220",
                p: 1,
                borderRadius: 2
            }}
        >
            <Typography sx={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                {label}
            </Typography>
            <Typography sx={{ fontWeight: 800, color }}>
                {value}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ background: "#0B1220", minHeight: "100vh", py: 2, mt: 8 }}>
            <Container maxWidth="xl">

                {/* HEADING */}
                <Typography sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.6rem" }
                }}>
                    <i className="fa-solid fa-cart-shopping"></i> My Cart
                </Typography>

                {/* OFFER */}
                <Paper sx={{
                    p: 2,
                    mb: 3,
                    background: "#14532D",
                    color: "#DCFCE7",
                    borderRadius: 2,
                    fontWeight: 600
                }}>
                    🎁 Free Delivery On All Orders
                </Paper>

                {/* EMPTY */}
                {cart.length === 0 ? (
                    <Paper sx={{ p: 5, background: "#0F172A", color: "#fff", textAlign: "center" }}>
                        Cart Is Empty
                    </Paper>
                ) : (
                    <>
                        <Stack spacing={2}>

                            {cart.map((item) => (

                                <Card key={item.id} sx={{ background: "#111827", color: "#fff", borderRadius: 3 }}>
                                    <CardContent>

                                        {/* CART ROW */}
                                        <Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            flexDirection: { xs: "column", sm: "row" },
                                            alignItems: "center",
                                            gap: 1
                                        }}>

                                            {/* PRODUCT */}
                                            <Box sx={{ flex: 2, display: "flex", gap: 2, alignItems: "center" }}>
                                                <Box
                                                    component="img"
                                                    src={item.thumbnail}
                                                    sx={{
                                                        width: 65,
                                                        height: 65,
                                                        borderRadius: 2
                                                    }}
                                                />
                                                <Box>
                                                    <Typography fontWeight={700}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography sx={{ color: "#9CA3AF", fontSize: "0.8rem" }}>
                                                        {item.brand}
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            {/* ITEM PROPERTIES */}
                                            {cell("Discount", `${item.discountPercentage?.toFixed(0)}%`, "#4ADE80")}
                                            {cell("Rating", `⭐ ${item.rating}`, "#FACC15")}

                                            {/* QTY */}
                                            <Box sx={{
                                                flex: 1,
                                                textAlign: "center",
                                                background: "#0B1220",
                                                p: 1,
                                                borderRadius: 2
                                            }}>
                                                <Typography sx={{ fontSize: "0.72rem", color: "#9CA3AF" }}>
                                                    Qty
                                                </Typography>

                                                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                                                    <Button size="small" variant="contained"
                                                        onClick={() => dispatch(increaseQty(item.id))}>+</Button>

                                                    <Typography sx={{ fontWeight: 800 }}>
                                                        {item.quantity}
                                                    </Typography>

                                                    <Button size="small" color="warning" variant="contained"
                                                        onClick={() => dispatch(decreaseQty(item.id))}>-</Button>
                                                </Box>

                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    sx={{ mt: 1 }}
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                >
                                                    Remove
                                                </Button>
                                            </Box>

                                            {cell("Price", `₹${(item.price * item.quantity).toFixed(2)}`, "#FACC15")}

                                        </Box>

                                    </CardContent>
                                </Card>

                            ))}

                        </Stack>

                        {/* PRICE DETAILS */}
                        <Paper sx={{ mt: 3, p: 3, background: "#0F172A", color: "#fff", borderRadius: 3 }}>

                            <Typography fontWeight={800} mb={2}>
                                💰 Price Details
                            </Typography>

                            <Box sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1
                            }}>

                                {cell("Subtotal", `₹${subtotal.toFixed(2)}`)}
                                {cell("Discount", `-₹${savings.toFixed(2)}`, "#4ADE80")}
                                {cell("Delivery", "FREE", "#4ADE80")}
                                {cell("Saved", `₹${savings.toFixed(2)}`, "#4ADE80")}
                                {cell("Total", `₹${total.toFixed(2)}`, "#FACC15")}

                            </Box>

                            {/* FINAL BUTTON (WIDTH BASED ON TEXT) */}
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <i className="fa-solid fa-wallet"></i>
                                    }
                                    onClick={handleBuyNow}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 800,
                                        background: "#2563EB",
                                        width: "fit-content"
                                    }}
                                >
                                    Proceed To Payment
                                </Button>
                            </Box>

                        </Paper>

                    </>
                )}
            </Container>
        </Box>
    );
}

export default Cart;