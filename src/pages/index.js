import React from "react";

// 引入组件
import Recommend from "../views/recommend";
import Rank from "../views/rank";
import Search from "../views/search";

// 引入样式
import "../assets/css/index.css";

// 引入路由
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
class Index extends React.Component {
  render() {
    return (
      <div className="index">
        <div className='top'>
          <div className="navTitle">优音乐</div>
          <div className="navBar">
            {/* 路由链接 */}
            <NavLink activeClassName='active' to="/index/recommend">推荐音乐</NavLink>
            <NavLink activeClassName='active' to="/index/rank">热歌榜</NavLink>
            <NavLink activeClassName='active' to="/index/search">搜索</NavLink>
          </div>
        </div>

        {/* 路由出口 */}
        <Switch>
          <Route path="/index/recommend" component={Recommend}></Route>
          <Route path="/index/rank" component={Rank}></Route>
          <Route path="/index/search" component={Search}></Route>
          <Redirect to="/index/recommend"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default Index;
