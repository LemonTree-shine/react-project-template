import React, { Component } from "react";
import ReactDom from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import App from './src/app';



ReactDom.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("contain"),
    () => {
        //回调
    }
)
