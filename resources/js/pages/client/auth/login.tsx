import React, { useEffect, useState } from "react";
import { Box, ButtonBase, InputBase } from "@mui/material";
import DefaultButton from "../../../components/button";
import axios, { AxiosResponse } from 'axios';
import {useNavigate } from 'react-router-dom';
import {  setclient,setid,setname } from '../../.././redux/reducers/authentication'
import {  useAppDispatch } from '../../.././redux/hooks'
import  setAuthToken from '../../.././redux/utils/setauthtoken'
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
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userid,setUserId]=useState("");
    const [password,setPassword]=useState("");
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setUserId(e.target.value);
    };
    useEffect(() => {
        if(localStorage.getItem('lineid')&&localStorage.getItem('token'))
       {
        navigate('/');
       }
       else{
        localStorage.clear();
       }
    }, [])
    const logIn=(id:string,pass:string)=>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"userid":id,"password":pass});
        try{
            axios.post('/api/client/login',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    localStorage.setItem("token",response.data["data"]["token"]);
                    localStorage.setItem("username",response.data["data"]["username"]);
                    setAuthToken(response.data["data"]["token"]);
                    dispatch(setclient(true));
                    dispatch(setname(response.data["data"]["username"]));
                    dispatch(setid(response.data["data"]["id"]));
                    if(response.data["data"]["LineId"]=='0')
                    {
                        if(response.data["data"]["midpass"]!=pass){
                            navigate('/client/alignment');
                        }else{
                            navigate('/client/resetpass');
                        }
                        if(response.data["data"]["change"]==1){
                            localStorage.setItem('change','1');
                        }
                    }
                    else{
                        localStorage.setItem('lineid','1');
                        navigate('/');
                    }
                }else{
                    handleClickOpen();
                }
            }).catch((err)=>{
                handleClickOpen();
            });
        }
        catch(err){
            handleClickOpen();
        }
    }
    const signUp=(id:string,pass:string)=>{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"userid":id,"password":pass});
        try{
            axios.post('/api/client/register',body,config).then((response:AxiosResponse)=>{
            });
        }
        catch(err){

        }
    }
    return (
        <div className="">
            <p className="text-6xl  text-mainColor pt-48 font-semibold text-center pb-28 tracking-[.05em]">PERIO</p>
            <div className="px-10" style={{ fontFamily: '"ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", "Meiryo", "verdana", sans-serif'}}>
                <p className="text-sm font-bold  pb-2 text-mainColor">PERIO ID</p>
                <input   className="tracking-[.3em] rounded-xl text-base  border border-borderColor focus:outline-none focus:border-focusColor bg-white px-4 py-3 border-cyan-400 font-semibold w-full" placeholder="ID" value={userid} onChange={(value:React.ChangeEvent<HTMLInputElement>)=>{handleChange(value);}}/>
                <p className="pt-5 text-sm font-bold  pb-2 text-mainColor">パスワード</p>
                <input   className="tracking-[.3em] rounded-xl text-base  border border-borderColor focus:outline-none focus:border-focusColor bg-white px-4 py-3 border-cyan-400 font-semibold w-full" placeholder="PASSWORD" type="password" value={password} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value);}}/>
                <div className="my-10">
                <div  className=" btn btn-primary">
                    <DefaultButton buttonClick={()=>{logIn(userid,password)}} text="ログイン"/>
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
                <p className="text-center text-base font-bold pb-2 text-black">パスワードがわからない場合は、<br></br>お問い合わせをお願いします</p>
            </div>
        </div>
    );
};

export default Login;

// signUp(userid,password);
