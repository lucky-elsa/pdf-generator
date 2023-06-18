import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { ja } from "date-fns/locale";
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks'
import {  changedate } from '../../../.././redux/reducers/dataslice'
import { useNavigate } from "react-router-dom";

const Calender = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const date = localStorage.getItem('date');
    const [value, setValue] = React.useState<Date | null>(new Date());
    const today = new Date();
    var showDate = new Date(today.getFullYear(), today.getMonth(), 1);
    useEffect(() => {
        document.addEventListener("click", function(e) {
            const target=e.target as HTMLTableColElement;
            if(target.classList.contains("p-calendar__td") || target.classList.contains("today")) {
                dispatch(changedate(new Date(target.dataset.date!.replace(/-/g, "/"))));
                navigate('../');
                // alert('クリックした日付は' +target.dataset.date+ 'です')
            }
        })
        showProcess(showDate);
    },[]);
    function prev(){
        showDate.setMonth(showDate.getMonth() - 1);
        showProcess(showDate);
    }

    // 次の月表示
    function next(){
        showDate.setMonth(showDate.getMonth() + 1);
        showProcess(showDate);
    }
    const week = ["日", "月", "火", "水", "木", "金", "土"];
    function showProcess(date:Date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        document.querySelector('#_p-calender__yearAndMonth')!.innerHTML = year + "年 " + (month + 1) + "月";

        var calendar = createProcess(year, month);
        document.getElementById('calendar')!.innerHTML = calendar;
    }

    // カレンダー作成
    function createProcess(year:number, month:number) {
        // 曜日
        var calendar = "<table class='_p-calender__table'><tr class='_p-calender__dayOfWeek'>";
        for (var i = 0; i < week.length; i++) {
            calendar += "<th class='_p-calender__th'>" + week[i] + "</th>";
        }
        calendar += "</tr>";
        var count = 0;
        var startDayOfWeek = new Date(year, month, 1).getDay();
        var endDate = new Date(year, month + 1, 0).getDate();
        var lastMonthEndDate = new Date(year, month, 0).getDate();
        var row = Math.ceil((startDayOfWeek + endDate) / week.length);

        // 1行ずつ設定
        for (var i = 0; i < row; i++) {
            calendar += "<tr class='_p-calender__tr'>";
            // 1colum単位で設定
            for (var j = 0; j < week.length; j++) {
                if (i == 0 && j < startDayOfWeek) {
                    // 1行目で1日まで先月の日付を設定
                    calendar += "<td class='disabled'>" + (lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
                } else if (count >= endDate) {
                    // 最終行で最終日以降、翌月の日付を設定
                    count++;
                    calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
                } else {
                    // 当月の日付を曜日に照らし合わせて設定
                    count++;
                    if(year == today.getFullYear()
                    && month == (today.getMonth())
                    && count == today.getDate()){
                        calendar += `<td class='today' data-date='${year}-${(month)+1}-${count}'>` + count + "</td>";
                    } else {
                        calendar += `<td class='p-calendar__td' data-date='${year}-${(month)+1}-${count}'> `+ count + "</td>";
                    }
                }
            }
            calendar += "</tr>";

        }
        return calendar;
    }
    return (
        <div >
            <p className="text-3xl text-mainColor py-4 font-black text-center pb-2">{"歯みがき記録"}</p>
            <p className="text-base text-mainColor pt-2 font-light text-center pb-2">{"自分の記録をみてみましょう"}</p>
            <div className="w-full _p-calender__wrapper">
                <div className="_p-calender__header c-flex-row-centerbetween ">
                <div id="_p-calender__yearAndMonth"></div>
                <div id="_p-calender__button">
                    <button id="prev" onClick={prev}></button>
                    <button id="next" onClick={next}></button>
                </div>
                </div>
                <div id="calendar" className=""></div>
            </div>
            {/* <LocalizationProvider   locale={ja}  dateAdapter={AdapterDateFns} dateFormats={{ monthAndYear: 'YYYY MM' }}>
                <StaticDatePicker
                    className="text-mainColor"
                    displayStaticWrapperAs="desktop"
                    value={date}
                    views={["year","day"]}
                    onChange={(newValue) => {
                        dispatch(changedate(newValue!));
                        // console.log(newValue);
                    }}
                    renderInput={(params) => <TextField  {...params} />}
                />
            </LocalizationProvider> */}
        </div>
    );
};

export default Calender;
