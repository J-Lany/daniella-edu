
import { useSelector } from 'react-redux';
import { RootState } from './types/RootState';
import { Link, Navigate } from 'react-router-dom';
const App = () => { 
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)    
    return (
        isAuthenticated ? <p>You are logged in</p> :
        <Navigate to="/login" replace={true} />
    )
 }
