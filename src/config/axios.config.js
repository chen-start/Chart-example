import axios from 'axios';
import {Component} from 'react';

let net = axios.create({
    baseURL: 'http://localhost:4000/api',
    // withCredentials: true,
    timeout: 10000,
});

net.interceptors.response.use(
    res => {
        console.log("请求成功的地址为:_______", res.config.url);
    }
)

Component.prototype.$http = net;
