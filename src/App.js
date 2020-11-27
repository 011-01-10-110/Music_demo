import React from "react";

// 引入组件
import Index from './pages/index';
import List from './pages/list';
import Play from './pages/play';

// 引入路由
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (<div>
        {/* 路由出口 */}
        <Switch>
            <Route path='/index' component={Index}></Route>
            <Route path='/list' component={List}></Route>
            <Route path='/play' component={Play}></Route>
            <Redirect to='/index'></Redirect>
        </Switch>
    </div>);
  }
}
export default App