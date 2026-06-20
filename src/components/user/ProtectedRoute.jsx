import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

function ProtectedRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("user"));
    const { username } = useParams();

    // Not logged in → go login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Wrong username in URL → redirect correct route
    if (user.username !== username) {
        return <Navigate to={`/${user.username}/home`} replace />;
    }

    return children;
}

export default ProtectedRoute;