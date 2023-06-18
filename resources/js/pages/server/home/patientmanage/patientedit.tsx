import React, { useState, useEffect } from "react";
import Button from "../../../../components/button";
import { Route, Routes, NavLink, Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../.././redux/hooks'
import { changedata, changedate } from '../../../.././redux/reducers/dataslice'
import AdminDefaultButton from "../../../../components/adminbutton";
import { BRESH_TIME,SELF, BRESH_TOOL, MO_STATUS, PROGRAM } from "../../../../redux/type";
import { CSVLink } from "react-csv";
import MuiButton from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { changeuser } from "../../../../redux/reducers/userslice";

const PatientEdit = () => {
    interface DataState {
        id:number
        time: string,
        type:number,
        value:string|null,
        date:string|null,
        updated_at:string
      }
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [typing, setTyping] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };
    const [lastpage,setLastPage]=useState(1);
    const headers = [
        { label: "dataid", key: "dataid" },
        { label: "patientid", key: "patientid" },
        { label: "患者名", key: "name" },
        { label: "入力日時", key: "date" },
        { label: "タイムスタンプ", key: "timestamp" },
        { label: "記録データ", key: "type" },
        { label: "データ", key: "info" },
        { label: "画像", key: "image" },
    ];
    const [csvdata, setCsvData] = useState(Array<{
        dataid: number;
        patientid: string;
        name: string;
        date: string | null;
        timestamp: string;
        type: string;
        info: string | null;
        image: string;
    }>());
    const data = useAppSelector((state) => state.data.value);
    const index=Number(localStorage.getItem('index'));
    const selectuser = useAppSelector((state) => state.user.value)[index];
    const dispatch = useAppDispatch();
    const [navindex, setNavindex] = useState(1);
    const [password, resetPassword] = useState("");
    const [info, setInfo] = useState("");
    const [change, setChange] = useState(0);
    const [startindex, setStart]=useState(1);
    const getUserdata = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/getuserdata?userid=` + selectuser.id + `&page=` + navindex, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changedata(response.data["data"][0]["data"]));
                    setLastPage(response.data["data"][0]["last_page"]);
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        if(selectuser){
            resetPassword(selectuser.midpass!);
            setInfo(selectuser.info!);
            setChange(selectuser.change!);
        }
    }, [selectuser])
    const getAlldata = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/getuserdata?userid=` + selectuser.id + `&page=-1`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    var csv=Array<DataState>();
                    csv.splice(0);
                    for(let i=0;i<response.data["data"][0].length;i++)
                        {
                            csv.push({
                                "id":response.data["data"][0][i]["id"],
                                "time":response.data["data"][0][i]["time"],
                                "type":response.data["data"][0][i]["type"],
                                "value":response.data["data"][0][i]["value"],
                                "date":response.data["data"][0][i]["date"],
                                "updated_at":response.data["data"][0][i]["updated_at"],
                            });
                        }
                    getcsvdate(csv);
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    const getcsvdate = (datas:Array<DataState>) => {
        let csv = [];
        let csvindex=0;
        for (let i = 0; i < datas.length; i++) {
            switch(datas[i].type){
                case 1:csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type:"起床", info: "", image: "" };
                        csvindex++;
                        csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type:"朝のお口の状態", info: MO_STATUS[Number(datas[i].value!) - 1], image: "" };
                        csvindex++;
                        break;
                case 2:csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type: "歯磨き記録", info: getstate(datas[i].value!), image: "" };csvindex++;break;
                case 3:csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type: "食事の記録", info: datas[i].value!.split("|")[0], image: datas[i].value!.split("|")[1] };csvindex++;break;
                case 4:csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type: "就寝", info: "", image: "" };csvindex++;break;
                case 5:csv[csvindex] = { dataid: datas[i].id, patientid: selectuser.userid, name: selectuser.name, timestamp: datas[i].date?.toString() + " " + datas[i].time, date: datas[i].updated_at.split("T")[0]+" "+datas[i].updated_at.split("T")[1].substring(0,8), type: "セルフ検査", info: SELF[Number(datas[i].value!.split("|")[0])-1], image: datas[i].value!.split("|")[1] };csvindex++;break;
            }
        }
        // console.log(csv);
        setCsvData(csv);
}
    const getDate = (date: string, time: string) => {
        return date.split("-")[0] + "/" + date!.split("-")[1] + "/" + date!.split("-")[2] + " " + (time.split(":")[0].substring(0, 1) == "0" ? time.split(":")[0].substring(1) : time.split(":")[0]) + ":" + time.split(":")[1];
    }
    const getstate = (value: string) => {
        return (Number(value!.split("|")[1]) == 0 ? "" : "歯磨き" + BRESH_TIME[Number(value!.split("|")[1]) - 1])
            + ((Number(value!.split("|")[0].split(',')[0])) == 1 ? ", " + BRESH_TOOL[0] : "")
            + ((Number(value!.split("|")[0].split(',')[1])) == 1 ? ", " + BRESH_TOOL[1] : "")
            + ((Number(value!.split("|")[0].split(',')[2])) == 1 ? ", " + BRESH_TOOL[2] : "")
    }
    useEffect(() => {
        if(selectuser)
            getAlldata();
    }, [selectuser])
    useEffect(() => {
        if(selectuser)
            getUserdata();
    }, [navindex,selectuser])
    const resetPass = () => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ "id": selectuser.id });
        try {
            axios.post('/api/admin/clientresetpass', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    resetPassword(response.data["password"]);
                    setChange(0);
                    // dispatch(changeuser({index:index,value:response.data["data"]['password'].toString(),change:0}));
                } else {

                }
            });
        }
        catch (err) {

        }
    }
    const resetInfo = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ "id": selectuser.id, "info": info });
        try {
            axios.post('/api/admin/clientresetInfo', body, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    setInfo(info);
                } else {

                }
            });
        }
        catch (err) {

        }
    }
    return (
        !selectuser?<div></div>:
        <div className="min-h-screen h-full overflow-hidden ml-[60px] flex flex-basis">
            <div className="basis-1/4 bg-white  px-[20px] pt-[54px]">
                <div className="flex items-center mb-[20px] ">
                    <p className="text-[24px] font-bold mr-[20px]">
                        患者情報
                    </p>
                    <NavLink to="../patientinfoedit">
                        <AdminDefaultButton text="編集" buttonClick={() => { }} />
                    </NavLink>
                </div>
                <table className="">
                    <tbody>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px]">
                                    診察券番号
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.ticketid}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px]">
                                    患者氏名
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px] ">
                                    ID
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.userid}</p>
                            </td>
                        </tr>
                        {change==1?
                            <tr>
                                <td className="text-right">
                                    <p className="text-[16px] font-bold pr-[56px] ">
                                        パスワード
                                    </p>
                                </td>
                                <td>
                                    <p className="text-[16px] font-bold text-responseColor tracking-[.25em] line-through">{password}</p>
                                </td>
                            </tr>
                            :
                            <tr>
                            <td className="text-right">
                                <p className="text-[16px] font-bold pr-[56px] ">
                                    パスワード
                                </p>
                            </td>
                            <td>
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{password}</p>
                            </td>
                        </tr>}
                    </tbody>
                </table>
                <div className="flex flex-row-reverse">
                        <AdminDefaultButton text="パスワードを再発行する" buttonClick={handleClickOpen} />
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"パスワード変更"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        本当にパスワードを変更しますか？
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <MuiButton onClick={handleClose}>キャンセル</MuiButton>
                        <MuiButton onClick={()=>{resetPass();handleClose();}} autoFocus>
                            変更する
                        </MuiButton>
                        </DialogActions>
                    </Dialog>

                </div>
                <p className="text-[16px] font-bold pt-[56px] pb-[8px]">
                    患者メモ
                </p>
                <textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setInfo(e.target.value); setTyping(true);}} value={info == null ? "" : info!} className={"pb-[15px] resize-none font-[13px] p-[15px] border-2 border-adminborderColor w-full "+(typing?"bg-white":"bg-textareaColor")} rows={13} placeholder="症状・メモ等" />
                <div className="flex flex-row-reverse">
                    <AdminDefaultButton text="保存" buttonClick={resetInfo} />
                </div>
            </div>
            <div className="basis-3/4 ml-[20px]  mt-[20px] flex flex-col">
                <div className="bg-white w-full  pl-[68px]">
                    <div className="flex items-center mb-[37px] ">
                        <p className="text-[24px] font-bold mr-[20px]">
                            サマリー
                        </p>
                        <NavLink to="../treatset">
                            <AdminDefaultButton text="治療設定" buttonClick={() => { }} />
                        </NavLink>
                    </div>
                    <div className="flex items-center pb-[55px]">
                        {/* <p className="text-[16px] font-bold pr-[79px]">
                            初回セルフ検査日
                        </p>
                        <p className="text-[16px] font-bold text-responseColor tracking-[.25em]  pr-[100px]">{selectuser.date}</p> */}
                        <p className="text-[16px] font-bold pr-[79px]">
                            セルフケアタイプ
                        </p>
                        <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{PROGRAM[Number(selectuser.type) - 1]}</p>
                    </div>
                </div>
                <div className="mt-[20px] h-full bg-white px-[68px] shrink">
                    <div className="flex justify-between mb-[37px] items-center">
                        <div className="flex items-center ">
                            <p className="text-[24px] font-bold mr-[20px]">
                                実施ログ
                            </p>
                            <CSVLink headers={headers} data={csvdata} >
                                <AdminDefaultButton text="csvDL" buttonClick={() => { }} />
                            </CSVLink>
                        </div>
                        <div className="flex flex-row">
                            {
                                lastpage<7?<></>:
                                <div className={"flex items-center justify-center ml-[20px] w-[32px] h-[32px] rounded-[50%] mr-[20px] "}>
                                    <button onClick={() => {if(startindex>1)setStart(startindex-1) }} className="text-[14px] mx-[2px] sm:py-2 font-content">{"<<"}</button>
                                </div>
                            }
                            {
                                Array(lastpage<7?lastpage:5).fill(1).map((element,index) => {
                                    return <button className="text-[20px] font-bold mr-[20px]" key={index} onClick={()=>{setNavindex(startindex+index);}}>{startindex+index}</button>
                                })
                            }
                            {
                                lastpage<7?<></>:
                                <div className={"flex items-center justify-center w-[32px] h-[32px] rounded-[50%] "}>
                                    <button onClick={() => { if(startindex+5<=lastpage)setStart(startindex+1)}} className="text-[14px] mx-[2px] sm:py-2 font-content">{">>"}</button>
                                </div>
                            }
                        </div>
                    </div>
                    <table className=" w-full">
                        <tbody>
                            <tr className="text-left text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor">
                                <th className="pl-[90px] py-[12px]">
                                    記録日時
                                </th>
                                <th className=" py-[12px]">
                                    記録の種類
                                </th>
                                <th className=" py-[12px]">
                                    記録内容
                                </th>
                                <th className=" py-[12px]">
                                    添付画像
                                </th>
                            </tr>
                            {
                                data && data.map((v, index) => {
                                    switch (v.type) {
                                        case 1: return <>
                                            <tr key={index.toString()} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                                <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                                <td>起床</td>
                                                <td >
                                                    <p className="py-[10px]"></p>
                                                </td>
                                                <td className="py-[22px] text-right">

                                                </td>
                                            </tr>
                                            <tr key={index.toString() + ".1"} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                                <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                                <td>朝のお口の状態</td>
                                                <td >
                                                    <p className="py-[10px]">{MO_STATUS[Number(v.value!) - 1]}</p>
                                                </td>
                                                <td className="py-[22px] text-right">
                                                </td>
                                            </tr>
                                        </>
                                        case 2: return <tr key={index.toString()} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                            <td>歯磨き記録</td>
                                            <td >
                                                <p className="py-[10px]">{getstate(v.value!)}</p>
                                            </td>
                                            <td className="py-[22px] text-right">

                                            </td>
                                        </tr>
                                        case 3: return <tr key={index.toString()} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                            <td>食事の記録</td>
                                            <td >
                                                <p className="py-[10px]">{v.value!.split("|")[0]}</p>
                                            </td>
                                            <td className="py-[22px] text-right">
                                                <img src={v.value!.split("|")[1]} className="w-[195px] h-auto py-4"></img>
                                            </td>
                                        </tr>
                                        case 4: return <tr key={index.toString()} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                            <td>就寝</td>
                                            <td >
                                                <p className="py-[10px]"></p>
                                            </td>
                                            <td className="py-[22px] text-right">
                                            </td>
                                        </tr>
                                        case 5: return <tr key={index.toString()} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!, v.time)}</td>
                                            <td>セルフ検査</td>
                                            <td >
                                                <p className="py-[10px]">{SELF[Number(v.value!.split("|")[0])-1]}</p>
                                            </td>
                                            <td className="py-[22px] text-right">
                                                <img src={v.value!.split("|")[1]} className="w-[195px] h-auto py-4"></img>
                                            </td>
                                        </tr>
                                    }
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientEdit;
