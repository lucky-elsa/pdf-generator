import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Box, ButtonBase, InputBase } from "@mui/material";
import AdminDefaultButton from "../../../components/adminbutton";
import axios, { AxiosResponse } from 'axios';
import {  setadmin } from '../../.././redux/reducers/authentication'
import  setAuthToken from '../../.././redux/utils/setauthtoken'
import {  useAppDispatch } from '../../.././redux/hooks'
import {useNavigate } from 'react-router-dom';
import MuiButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    const navigate = useNavigate();
    const [userid,setUserId]=useState("");
    const dispatch = useAppDispatch();
    const [password,setPassword]=useState("");
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserId(e.target.value);
    }
    const logIn=()=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"userid":userid,"password":password});
        try{
            axios.post('/api/admin/login',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    localStorage.setItem("token",response.data["data"]["token"]);
                    setAuthToken(response.data["data"]["token"]);
                    dispatch(setadmin(true));
                    navigate('/admin/main');
                    navigate(0);
                }else{
                    handleClickOpen();
                }
            });
        }
        catch(err){
            handleClickOpen();
        }
    }
    useEffect(() => {
        if(localStorage.getItem('token'))
       {
        console.log('a');
        navigate('/admin');
       }
       else{
        localStorage.clear();
       }
    }, []);
    return (
        <div className="bg-white min-h-full  w-full">
            <p className="text-9xl text-teal-700 pt-44 font-semibold text-center pb-32">PERIO</p>
            <div className="w-1/2 mx-auto">
                <p className="text-sm font-bold text-teal-700 pb-2">クリニックID</p>
                <input   className="tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-focusColor bg-[background: #F9F9F9] px-4 py-3 border-cyan-400 font-semibold w-full" placeholder="ID" value={userid} onChange={(value:React.ChangeEvent<HTMLInputElement>)=>{handleChange(value);}}/>
                <p className="pt-5 text-sm font-bold text-teal-700 pb-2">パスワード</p>
                <input   className="tracking-[.3em] rounded-xl text-base  border border-adminborderColor focus:outline-none focus:border-focusColor bg-[background: #F9F9F9] px-4 py-3 border-cyan-400 font-semibold w-full" placeholder="PASSWORD" type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value);}}/>
                <div className="my-20 flex justify-center ">
                     <AdminDefaultButton buttonClick={logIn} text="ログイン"/>
                     <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"ログインエラー"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        ログインIDまたはパスワードが正しくありません。ご確認の上再度お試しください。
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <MuiButton onClick={handleClose} autoFocus>
                             確認
                        </MuiButton>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Login;
