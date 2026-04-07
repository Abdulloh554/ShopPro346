import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    
    // Check if user exists and is an admin
    if (!user || !user.isAdmin) {
        return <Navigate to="/admin-login" replace />;
    }

    return children;
};

export default ProtectedRoute;
