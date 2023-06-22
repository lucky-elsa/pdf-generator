import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ComponentType } from 'react';

interface PrivateRouteProps {
    component: ComponentType;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.authenticater.authentication)

    if (isAuthenticated) return <Component />;

    return <Navigate to="/login" />;
};

export default PrivateRoute;