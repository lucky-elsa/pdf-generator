import React, { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Admin from '../pages/server';
import Client from "../pages/client";

const Router = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log(window.location.hostname, "sdfdf", window.location.pathname);
        if (window.location.hostname.includes('admin.') && window.location.pathname.includes('/client')) {
            window.location.href = '/admin';
        }
    }, [])
    if (window.location.pathname == '/linelogin') {
        localStorage.setItem('lineid', '1');
    }
    return (
        <div>
            
        </div>
    )
}

export default Router;
