import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../css/app.css"
import { Provider } from 'react-redux';
import store from './redux/store';
import { useAppDispatch } from './redux/hooks'
import PrivateRoute from "./routes/PrivateRoute";

import { setAvatar, setAuthentication, setid, setname } from './redux/reducers/authentication'

import setAuthToken from "./redux/utils/setauthtoken";
import Register from "./pages/Register";
import Add from "./pages/Add_crewing";
import Crewing from "./pages/Crewing";
import Preview from "./pages/Preview";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import About from "./pages/About";
import Login from "./pages/Login";
import Term from "./pages/Term";
import CV from "./pages/CV"

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);

if (localStorage.getItem('token')) {
    // setAuthToken set the x-auth-token to the header with axios, like we do in postman
    setAuthToken(localStorage.getItem('token'));
}
export default function App() {
    return (
        <Provider store={store}>
            <div className="app-container">
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Crewing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about_project" element={<About />} />
                        <Route path="/cv" element={
                            <PrivateRoute component={CV} />
                        } />
                        <Route path="/preview" element={<Preview />} />
                        <Route path="/term" element={<Term />} />
                        <Route path="/add_crewing" element={<PrivateRoute component={Add} />} />
                    </Routes>
                </BrowserRouter>
                <Footer />
            </div>
        </Provider>
    );
}
