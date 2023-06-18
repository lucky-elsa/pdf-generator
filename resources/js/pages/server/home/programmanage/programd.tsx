import axios, { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import {Route,Routes, Navigate, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { loadvideos } from '../../../.././redux/reducers/videoslice'
import { data } from 'jquery';

const ProgramD = () => {
    const video = useAppSelector((state) => state.video.value);
    const dispatch = useAppDispatch();
    const loadvideo = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/loadvideo?type=4`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(loadvideos(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        loadvideo();
    }, [])
    return (
        <div className='flex flex-wrap justify-center'>
           {
              video&&video.map((element,index) => {
                   return <div key={index} className="ml-[30px] mt-[30px] ">
                        <video key={element.image} width="311" height="172" controls >
                            <source src={element.image} type="video/mp4"/>
                        </video>
                        <p className="text-[20px] mx-[2px]  hover:text-mainColor sm:py-2 font-content">{element.title}</p>
                       </div>
               })
           }
        </div>
    )
  }
  export default ProgramD;
