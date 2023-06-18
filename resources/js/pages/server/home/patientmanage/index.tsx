import React, { useEffect } from 'react';
import {Route,Routes, Navigate } from 'react-router-dom';
import PatientEdit from './patientedit';
import PatientInfoEdit from './patientinfoedit';
import PatientList from './patientlist';
import Register from './register';
import TreatSet from './treatset';
import {  useAppDispatch,useAppSelector } from '../../../.././redux/hooks'
import axios, { AxiosResponse } from 'axios';
import { changeusers } from '../../../../redux/reducers/userslice';

const PatientManager = () => {
    const dispatch = useAppDispatch();
    const loadusers = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/loadusers`, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changeusers(response.data["data"][0]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    useEffect(() => {
        loadusers();
    },[])
    return (
        <Routes>
            <Route path='/' element={<PatientList />} />
            <Route path='/register' element={<Register />} />
            <Route path='/patientedit' element={<PatientEdit />} />
            <Route path='/patientinfoedit' element={<PatientInfoEdit />} />
            <Route path='/treatset' element={<TreatSet />} />
        </Routes>
    )
  }
  export default PatientManager;
