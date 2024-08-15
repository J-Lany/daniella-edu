
import { useSelector } from 'react-redux';
import { RootState } from './types/RootState';
const App = () => { 
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)    
    return (
        
    )
 }
