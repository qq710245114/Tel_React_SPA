import React, { Component } from 'react';
import {connect} from 'react-redux';
import Page1Top from './page1/Page1Top';
import Page1Middle from './page1/Page1Middle';
import EnterMain from './page2/EnterMain';
//import './App.css';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dispatch, page} = this.props;
    return (
      page === 1 ?
        <div>
          <Page1Top />
          <Page1Middle />
        </div> :
        <EnterMain />
    )
  }
}

/*// 基于全局 state ，哪些是我们想注入的 props ?
 // 注意：使用 https://github.com/reactjs/reselect 效果更佳。
 function select(state) {
 return {
 resultDate: state.resultDate,
 telAgent: state.telAgent,
 workParam: state.workParam
 };
 }*/
function select(state){
  return {
    page:state.page
  }
}
export default connect(select)(Home);
