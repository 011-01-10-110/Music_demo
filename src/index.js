import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";

// 全局引入样式
import './assets/css/reset.css'
import './assets/js/rem'

// 引入组件
import App from './App';

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
