import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { setAvatar, setAuthentication, setid, setname } from '../redux/reducers/authentication'
import { useAppDispatch } from '../redux/hooks'
import setAuthToken from '../redux/utils/setauthtoken'
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const userData = {
        "email": email,
        "password": password
    }

    const handleLogin = () => {
        axios.post('/api/user/login', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response: AxiosResponse) => {
            if (response.data["success"] == true) {
                localStorage.setItem("token", response.data["data"]["token"]);
                localStorage.setItem("username", response.data["data"]["name"]);
                localStorage.setItem("userId", response.data["data"]["id"]);
                localStorage.setItem("avatar", response.data["data"]["avatar"]);
                setAuthToken(response.data["data"]["token"]);
                dispatch(setAuthentication(true));
                dispatch(setname(response.data["data"]["name"]));
                dispatch(setid(response.data["data"]["id"]));
                dispatch(setAvatar(response.data["data"]["avatar"]));
                navigate('/');
            } else {
                alert('Something is wrong')
            }
        }).catch((err) => console.log(err));
    }

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');
    const avatar = localStorage.getItem('avatar');

    if (token) {
        dispatch(setAuthentication(true));
        dispatch(setname(username ?? ''));
        dispatch(setid(Number(userId) || 0));
        dispatch(setAvatar(avatar ?? ''));
    }

    return (
        <div>
            <Box className="mt-[135px] mb-[162px]"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 543,
                        height: 612,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: "9px",
                        backgroundColor: "#fff",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.25)",
                    },
                }}
            >
                <Paper sx={{ padding: "60px 99.5px" }} className='flex flex-col gap-[20px]'>
                    <div className='font-[500] text-[18px] leading-[22px] text-[#182233]'>Log-in</div>

                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-auto mr-auto h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        type="email"
                        placeholder='Username'
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-auto mr-auto h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <button
                        style={{ padding: "16px 24px" }}
                        onClick={handleLogin}
                        className='w-[89px] ml-auto mr-auto hover:bg-[#116bccd0] bg-[#116ACC] rounded-[7px] text-white text-[16px] leading-[20px] font-[500]'>
                        Login
                    </button>

                    <div className='font-[400] text-[14px] leading-[20px] text-[#182233]'>Or login with</div>

                    <button
                        className='p-[15px] w-full rounded-[10px] hover:bg-[#166ada] bg-[#1877F2] flex gap-[15px] text-[20px] leading-[23px] text-white font-[700]'>
                        <img src="/image/facebook.png" />
                        Sign In with Facebook
                    </button>

                    <button
                        style={{ boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168)" }}
                        className='p-[15px] w-full rounded-[10px] hover:bg-[#f0f0f0] bg-[#fff] flex gap-[15px] text-[20px] leading-[23px] text-[#787878] font-[600]'>
                        <img src="/image/google.png" />
                        Sign In with Google
                    </button>

                    <Link className='text-center text-[#116ACC] font-[400] text-[14px] leading-[20px]' to="/forgot">Forgot Password</Link>

                    <Link className='text-center text-[#116ACC] font-[400] text-[14px] leading-[20px]' to="/register">Register</Link>
                </Paper>
            </Box>
        </div>
    )
}
