import React, { useState } from "react";
import { Button, Card, CardContent, CardActions, Container, TextareaAutosize, Typography } from '@mui/material';
import DefaultButton from "./button";

interface ButtonProps {
    // text: string;
    // buttonClick: ()=>void;
}

function MealComponent(props: ButtonProps) {
    const [tabindex, settTab] = useState(1);
    const [hour, setHour] = useState(0);
    const [minutes, setMinutes] = useState(0);

    function setTabIndex(val: number) {
        settTab(val);
    }
    function getCurrentDate() {
        var weekday = ["日", "月", "火", "水", "木", "金", "土"];

        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let day = newDate.getDay();

        return `${month}月${date}日(${weekday[day]})`;
    }
    function getCurrentTime() {
        let newDate = new Date();
        setHour(newDate.getHours());
        setMinutes(newDate.getMinutes());
    }
    window.setInterval(function () {
        getCurrentTime();
    }, 1000);
    return (
        <div>
            <Card className="ml-10 mr-10" style={{ borderRadius: 10, border: '2px solid #88BFBF' }}>
                <CardContent style={{ paddingBottom: 0 }}>
                    <ul className="font-bold">
                        <Typography component="li" variant="h6" align="center" className="text-mainColor" style={{ fontWeight: 600 }}>
                            食事の画像を
                        </Typography>
                        <Typography component="li" variant="h6" align="center" className="text-mainColor" style={{ fontWeight: 600 }}>
                            撮影／アップロード
                        </Typography>
                        <Typography component="li" variant="h6" align="center" className="text-mainColor" style={{ fontWeight: 600 }}>
                            してください
                        </Typography>
                    </ul>
                </CardContent>
                <CardActions className="justify-center" style={{ paddingBottom: 20 }}>
                    <Button variant='outlined' style={{ color: '#106464', fontWeight: 600, border: '2px solid #106464', borderRadius: 20 }}>撮影／アップロード</Button>
                </CardActions>
            </Card>
            <Container maxWidth="sm" className="mt-10">
                <Typography component="h6" variant="h6" align="left" className="text-mainColor" style={{ fontWeight: 600 }}>
                    食事のメモ
                </Typography>
                <TextareaAutosize aria-label="minimum height" minRows={4} placeholder="" style={{ width: '100%', borderRadius: 8, border: '2px solid #88BFBF', padding: 5 }} />
            </Container>
            <Container maxWidth="sm" className="mt-5 text-center">
                <Typography variant="h5" display="inline" className="text-dayColor">
                    {getCurrentDate()}&nbsp;
                </Typography>
                <Typography variant="h3" display="inline" className="text-mainColor text-2xl">
                    {hour}:{minutes}
                </Typography>
            </Container>
            <DefaultButton text="記録をする" buttonClick={() => {}}></DefaultButton>
        </div>
    );
};
export default MealComponent;
