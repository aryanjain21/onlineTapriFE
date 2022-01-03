import { Route, Navigate } from 'react-router-dom'
import { useUser } from './context/userContext'

function PrivateRoute({ children }) {
    const { user } = useUser();
    return user.token ? children : <Navigate to="/login" />
}

export default PrivateRoute;