import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { clearCart } from '../../redux/slices/CartSlice';

import {
    Box,
    Container,
    Typography,
    Paper,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    Divider
} from "@mui/material";

function Payment() {

    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart.items);

    const [paymentMode, setPaymentMode] = useState("Cash On Delivery");

    // ✅ NEW STATE (ADDED ONLY)
    const [openPopup, setOpenPopup] = useState(false);

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

    const handlePayment = () => {

        if (cart.length === 0) {
            alert("Cart is Empty");
            return;
        }

        dispatch(clearCart());

        // ❌ REMOVED ALERT
        // alert(`🎉 Order Placed Successfully!\nPayment Method: ${paymentMode}`);

        // ✅ ADDED POPUP
        setOpenPopup(true);

        setTimeout(() => {
            setOpenPopup(false);
            navigate(`/${username}/home`);
        }, 2000);
    };

    const row = (label, value, color = "#fff") => (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 0.8
        }}>
            <Typography sx={{
                color: "#9CA3AF",
                fontSize: { xs: "0.75rem", sm: "0.85rem" }
            }}>
                {label}
            </Typography>

            <Typography sx={{
                fontWeight: 800,
                color,
                fontSize: { xs: "0.8rem", sm: "0.9rem" }
            }}>
                {value}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ background: "#0B1220", minHeight: "100vh", py: 3, mt: 8 }}>
            <Container maxWidth="sm">

                {/* TITLE */}
                <Typography sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: "1.1rem", sm: "1.6rem" }
                }}>
                    <i className="fa-solid fa-credit-card"></i> Payment Page
                </Typography>

                {/* ORDER SUMMARY */}
                <Paper sx={{ background: "#111827", color: "#fff", p: 2, borderRadius: 3, mb: 2 }}>
                    <Typography fontWeight={800} mb={1}>
                        Order Summary
                    </Typography>

                    {cart.map(item => (
                        <Box key={item.id} sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 1,
                            borderBottom: "1px solid #1f2937"
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1rem" }, fontWeight: 700 }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                                    Qty: {item.quantity}
                                </Typography>
                            </Box>

                            <Typography sx={{ color: "#FACC15", fontWeight: 700 }}>
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                </Paper>

                {/* BILL */}
                <Paper sx={{ background: "#111827", color: "#fff", p: 2, borderRadius: 3, mb: 2 }}>
                    <Typography fontWeight={800} mb={1}>
                        Bill Details
                    </Typography>

                    {row("Subtotal", `₹${subtotal.toFixed(2)}`)}
                    {row("Discount", `-₹${savings.toFixed(2)}`, "#4ADE80")}
                    {row("Delivery", "FREE", "#4ADE80")}
                    <Divider sx={{ borderColor: "#1f2937", my: 1 }} />
                    {row("Total", `₹${total.toFixed(2)}`, "#FACC15")}

                    <Typography sx={{
                        mt: 1,
                        color: "#4ADE80",
                        fontWeight: 700,
                        textAlign: "center",
                        fontSize: { xs: "0.8rem", sm: "0.9rem" }
                    }}>
                        🎉 You Saved ₹{savings.toFixed(2)}
                    </Typography>
                </Paper>

                {/* PAYMENT METHODS */}
                <Paper sx={{ background: "#111827", color: "#fff", p: 2, borderRadius: 3, mb: 2 }}>
                    <Typography fontWeight={800} mb={1}>
                        Payment Method
                    </Typography>

                    <RadioGroup
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                    >
                        <Box sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr" },
                            gap: 1
                        }}>
                            {[
                                ["Debit Card", "💳 Debit"],
                                ["Credit Card", "💳 Credit"],
                                ["Google Pay", "📲 GPay"],
                                ["PhonePe", "📲 PhonePe"],
                                ["Paytm", "📲 Paytm"],
                                ["Cash On Delivery", "🚚 COD"]
                            ].map(([val, label]) => (
                                <FormControlLabel
                                    key={val}
                                    value={val}
                                    control={<Radio sx={{ color: "#9CA3AF" }} />}
                                    label={<Typography sx={{ fontSize: { xs: "0.75rem", sm: "0.9rem" } }}>{label}</Typography>}
                                />
                            ))}
                        </Box>
                    </RadioGroup>
                </Paper>

                {/* BUTTON */}
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={handlePayment}
                        variant="contained"
                        startIcon={
                            <i className="fa-solid fa-money-check-dollar"></i>
                        }
                        sx={{
                            px: 4,
                            py: 1.2,
                            fontWeight: 800,
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                            background: "#2563EB",
                            width: "fit-content"
                        }}
                    >
                        Confirm Payment
                    </Button>
                </Box>

            </Container>

            {/* ✅ POPUP ADDED */}
            {openPopup && (
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}
                >
                    <Paper sx={{
                        p: 4,
                        textAlign: "center",
                        background: "#111827",
                        color: "#fff",
                        borderRadius: 3
                    }}>
                        <Typography sx={{ fontSize: "2.5rem" }}>
                            🎉
                        </Typography>

                        <Typography fontWeight={800} mt={1}>
                            Order Placed Successfully!
                        </Typography>

                        <Typography sx={{ color: "#9CA3AF", mt: 1 }}>
                            Payment Mode: {paymentMode}
                        </Typography>
                    </Paper>
                </Box>
            )}

        </Box>
    );
}

export default Payment;