'use strict'
const week = ["日", "月", "火", "水", "木", "金", "土"];
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
var showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);

};
// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

document.addEventListener("click", function(e) {
    if(e.target.classList.contains("p-calendar__td") || e.target.classList.contains("today")) {
        alert('クリックした日付は' +e.target.dataset.date+ 'です')
        window.location.href ='../record/add.html'
    }
})


// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#_p-calender__yearAndMonth').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    document.getElementById('calendar').innerHTML = calendar;
}

// カレンダー作成
function createProcess(year, month) {
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
                    calendar += `<td class='today' data-date='${year}/${(month + 1)}/${count}'>` + count + "</td>";
                } else {
                    calendar += `<td class='p-calendar__td' data-date='${year}/${(month + 1)}/${count}'> `+ count + "</td>";
                }
            }
        }
        calendar += "</tr>";

    }
    return calendar;
}
