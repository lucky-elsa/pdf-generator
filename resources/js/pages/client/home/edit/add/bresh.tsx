import React, { useState } from "react";
import { Button, Card, CardContent, CardActions, Container, TextareaAutosize, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import BreshComponent from "../../../../../components/breshcomponent";
import DefaultButton from "../../../../../components/button";
import ToolButton from "../../../../../components/toolcomponent";
import {  useAppDispatch,useAppSelector } from '../../../../.././redux/hooks'
import { useNavigate } from "react-router-dom";
import MuiButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Bresh = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const date=useAppSelector((state) => state.adddate.value);
    const [index_1, setIndex_1] = useState(false);
    const [index_2, setIndex_2] = useState(false);
    const [index_3, setIndex_3] = useState(false);
    const [tabindex, setTabIndex] = useState(0);
    const [time1, settime1] = useState("");
    function setTime(val:number){
        if(tabindex==val){
            setTabIndex(0);
        }
        else{
            setTabIndex(val);
        }
    }
    const create = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const body = JSON.stringify({ "time":time1, "date": date.getFullYear() + ":" + (date.getMonth() + 1) + ":" + date.getDate(), "type": 1, "value": `${Number(index_1)+","+Number(index_2)+","+Number(index_3)}|${tabindex}` });
        try {
            axios.post('/api/client/create', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    navigate('/client/home/edit/');
                } else {
                    handleClickOpen();
                }
            });
        }
        catch (err) {
            handleClickOpen();
        }
    }
    return (
        <div >
            <div className="mt-8">
                <BreshComponent tabindex={tabindex} buttonClick={setTime} />
            </div>
            <div className="flex  flex-row items-cneter justify-between mt-8">
                <ToolButton ispadding={true} size="w-28 h-36" buttonClick={() => { setIndex_1(!index_1) }} text="歯間ブラシ" className={index_1 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={index_1 == true ? "bresh.svg" : "bresh-none.svg"} />
                <ToolButton ispadding={false} size="w-28 h-36" buttonClick={() => { setIndex_2(!index_2) }} text="洗口剤" className={index_2 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]"} path={index_2 == true ? "material.svg" : "material-none.svg"} />
                <div className="w-28 h-36">
                    <button onClick={()=>{setIndex_3(!index_3);}} className={"flex flex-col justify-center items-center rounded-xl h-full  text-xs w-full  font-black border-transparent "+(index_3 == true ? "bg-btnbgColor text-white" : "bg-white text-mainColor shadow-[-1px_-1px_4px_4px_rgba(0,0,0,0.03)]")} id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">
                        <img src={"/images/"+(index_3 == true ? "flox.svg" : "flox-none.svg")} alt="Icon" />
                        フロス・<br/>糸ようじ
                    </button>
                </div>
            </div>
            <div className="w-full px-8 pt-12">
                <input style={{ WebkitAppearance: "none" }} className="flex items-center justify-center h-[43px] focus:outline-none focus:border-mainColor tracking-[.3em] text-center rounded-lg border border-mainColor text-[26px] text-mainColor font-bold  px-2 w-full bg-white" placeholder={time1==""?"--:--":""} type="time"  value={time1} onChange={(ev) => {settime1(ev.target.value);}} />
            </div>
            <DefaultButton text="記録をする" buttonClick={() => {
                create();
            }}></DefaultButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"エラー"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                正常に処理できませんでした。ページを再読み込みして再度お試しください。
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <MuiButton onClick={handleClose} autoFocus>
                        確認
                </MuiButton>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Bresh;
