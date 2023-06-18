import React, { useState } from "react";
import { Box, ButtonBase, InputBase } from "@mui/material";
import DefaultButton from "../../../components/button";
import MuiButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
export interface IUser {
    name: string;
    age: number;
}
const ResetPass = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    const [password,setPassword]=useState("");
    const resetPass=()=>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"password":password});
        try{
            axios.post('/api/client/resetpass',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    localStorage.setItem('change','1');
                        navigate('/client/alignment');
                }else{
                    handleClickOpen();
                }
            }).catch((err)=>{
                handleClickOpen();
            });;
        }
        catch(err){
            handleClickOpen();
        }
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }
    return (
        <div className="">
            <p className="text-6xl text-teal-700 pt-40 font-semibold text-center pb-40">PERIO</p>
            <div className="px-12">
                <p className="mb-15 text-xl font-bold text-teal-700 pb-2 text-center">パスワードを変更してください</p>
                <p className="pt-5 text-sm font-bold text-teal-700 pb-2">パスワード</p>
                <Box className="rounded-xl  border bg-white px-2 py-1 border-cyan-700 mb-32">
                    <InputBase placeholder="" value={password} onChange={handleChange}/>
                </Box>
                <DefaultButton buttonClick={resetPass} text="パスワードを変更する"/>
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
    );
};

export default ResetPass;
