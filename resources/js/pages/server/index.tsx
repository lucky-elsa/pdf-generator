import React, { useEffect, useState } from 'react';
import {Route,Routes, Navigate } from 'react-router-dom';
import Login from './auth/login';
import Home from './home';

const Admin = () => {
    const [flag,setFlag]=useState(false);
    const pathname = window.location.pathname.split('/')[2];
    if(pathname!="login"&&!flag){
        if( localStorage.getItem('token')){
            setFlag(true);
        }
    }
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/admin/main"/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/main' element={<Navigate to="/admin/main/patientmamage"/>} />
            {
                flag&& <Route path='/main/*' element={<Home />} />
            }
            {
                !flag&& <Route path='/main/*' element={<Navigate to="/admin/login"/>} />
            }
        </Routes>
    )
  }
  export default Admin;
