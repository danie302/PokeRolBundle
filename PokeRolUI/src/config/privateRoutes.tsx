import { Navigate, Outlet } from 'react-router-dom';

// Check if user is authenticated
export const PrivateRoutes = () => {
  const token = localStorage.getItem('token');
  return (
    token ? <Outlet/> : <Navigate to='/login'/>
  )
}