import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";

import ProtectedRoute from "./components/user/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./components/user/Home";
import Collections from "./components/user/Collections";
import Search from './components/user/Search';
import ProductDetails from "./components/user/ProductDetails";
import Cart from "./components/user/Cart";
import Payment from './components/user/Payment';
import Footer from './components/Footer';

import './App.css';


function App() {
  return (
    <BrowserRouter>

      <NavBar />

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/reg" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* PROTECTED ROUTES */}
        <Route path="/:username/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/:username/collections" element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        } />

        <Route path="/:username/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        } />

        <Route path="/:username/product/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />

        <Route path="/:username/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        <Route
        path="/:username/payment" element={
          <ProtectedRoute>
              <Payment />
          </ProtectedRoute>
        } />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;