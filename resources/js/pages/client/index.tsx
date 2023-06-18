import React, { useEffect, useState } from 'react';
import {Route,Routes, Navigate, useNavigate } from 'react-router-dom';
import {  useAppSelector } from '../../redux/hooks';
import Alignemnt from './auth/alignment';
import Login from './auth/login';
import ResetPass from './auth/resetpassword';
import Home from './home';
import axios, { AxiosResponse } from 'axios';
import {  setclient, setname } from '../.././redux/reducers/authentication'
import {  useAppDispatch } from '../.././redux/hooks'
import { tr } from 'date-fns/locale';
const Client = () => {

    const dispatch = useAppDispatch();
    const isauth = useAppSelector((state) => state.authenticater.client);
    const pathname = window.location.pathname.split('/')[2];
    const [flag,setFlag]=useState(false);
    const [line,setLine]=useState(false);
    const [change,setChange]=useState(false);
    const navigate = useNavigate();
    const Me=()=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        try{
            axios.get('/api/client/me',config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    dispatch(setclient(true));
                    return true;
                }else{
                    localStorage.removeItem('token');
                    setFlag(false);
                    return false;
                }
            }).catch((error)=>{
                localStorage.removeItem('token');
                setFlag(false);
            });
        }
        catch(err){
            return false;
        }
    }
    if(!line&&localStorage.getItem('lineid')){
        setLine(true);
    }
    if(!change&&localStorage.getItem('change')){
        setChange(true);
    }
    if(pathname!="login"&&!flag){
        if( localStorage.getItem('token')){
            setFlag(true);
            Me();
            dispatch(setname(localStorage.getItem('username')!));
        }
    }
    useEffect(() =>{

    },[])
    return (
        <Routes >
            <Route path='/' element={<Navigate to="/client/home"/>} />
            <Route path='/login' element={<Login/> }/>
            {flag && line&&
                <>
                    <Route path='/home' element={<Navigate to="/client/home/register/bresh"/>} />
                    <Route path='/home/register' element={<Navigate to="/client/home/register/bresh"/>} />
                    <Route path='/home/*' element={<Home/>} />
                </>
            }
            {flag && !line&&!change&&
                <>
                    <Route path='/*' element={<Navigate to="/client/resetpass"/>} />
                </>
            }
             {flag && !line&&
                <>
                    <Route path='/resetpass' element={<ResetPass/>} />
                    <Route path='/alignment' element={<Alignemnt/>} />
                    <Route path='/*' element={<Navigate to="/client/alignment"/>} />
                </>
            }
             {!flag &&
                <>
                    <Route path='/*' element={<Navigate to="/client/login"/>} />
                </>
            }
        </Routes>
    )
  }
  export default Client;
