/**
 * Created by zz on 2016/8/19.
 */
import React, {Component} from 'react';
export default class StatItem extends Component {
  /*constructor(props) {
    super(props);
    // this.ajax = this.ajax.bind(this);
    // this.state = {
    //   first: true//标识为ajax
    // }
  }*/

  // componentDidMount() {
  //   //console.log('StatItem componentDidMount')
  //   //this.ajax(this.props);
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   //console.log('StatItem componentWillReceiveProps');
  //   //this.ajax(nextProps);
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //   // return nextProps.date !== this.props.date; //不能这样判断 因为ajax没有改变props
  //   //此处日期是否相同，组件减少更新
  //   return true;
  // }
  //
  // componentWillUnmount() {//组件移除前停止异步操作。
  //   // this.ajaxRequest.abort();
  // }

  /*ajax(props) {//注意ajax内部this的指向
    const {date}=props;
    this.props.dispatch({
      type: "ADD_loadNum",
    });
    this.ajaxRequest = $.ajax({
      url: '/saleajax/telstatresult/',
      data: {
        citycode: window.xkTel.citycode,//城市编号
        level: window.xkTel.level,
        group_id: window.xkTel.group_id,//部组id
        jobid: window.xkTel.jobid,//销售工号
        start_date: date,
        end_date: date
      },
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          this.setState({
            first: false,
            ...res.result.data
          })
        } else {
          alert(res.result.message);
        }
        this.props.dispatch({
          type: "DEL_loadNum",
        });
      }.bind(this)
    })
  }*/

  render() {
    const data=this.props.data;
    /*if (this.state.first) {
      console.log("StatItem firstRender!");
      return null
    }*/
    if(!data){
      console.log("StatItem firstRender!");
      return null;
    }
    console.log("StatItem render");
    var c1 = data.conversion_complete / data.conversion_target * 100 || 0;
    var c_1 = c1 > 100 ? 100 : c1;
    var c2 = data.connect_complete / data.connect_target * 100 || 0;
    var c_2 = c2 > 100 ? 100 : c2;
    var arr = [data.talksection_1, data.talksection_2, data.talksection_3, data.talksection_4];
    arr.sort(function (a, b) {
      return b - a;
    });
    var max = arr[0];
    return (
      <div className="stat_l">
        <div className="content">
          <div className="item-1">
            <div className=" circle1">
              <div className="pie_left">
                <div className="left"
                     style={c_1 > 50 ? {transform: "rotate(" + (c_1 * 3.6 - 180) + "deg)"} : null}></div>
              </div>
              <div className="pie_right">
                <div className="right" style={{transform: "rotate(" + (c_1 <= 50 ? c_1 * 3.6 : 180) + "deg)"}}></div>
              </div>
              <div className="mask"><span>{Math.round(c1 === Number.POSITIVE_INFINITY ? 100 : c1)}</span>%</div>
            </div>
            <ul>
              <li className="g-line">
                <span className="g-u">转化目标 </span>
                <q className="g-lastu"><em>{data.conversion_target}</em>人</q>
              </li>
              <li className="g-line">
                <span className="g-u">已 完 成  </span>
                <q className="g-lastu"><em className="c1">{data.conversion_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div className="item-2">
            <div className="circle2">
              <div className="pie_left">
                <div className="left"
                     style={c_2 > 50 ? {transform: "rotate(" + (c_2 * 3.6 - 180) + "deg)"} : null}></div>
              </div>
              <div className="pie_right">
                <div className="right" style={{transform: "rotate(" + (c_2 <= 50 ? c_2 * 3.6 : 180) + "deg)"}}></div>
              </div>
              <div className="mask"><span>{Math.round(c2 === Number.POSITIVE_INFINITY ? 100 : c2)}</span>%</div>
            </div>
            <ul>
              <li className="g-line">
                <span className="g-u">接通目标 </span>
                <q className="g-lastu"><em>{data.connect_target}</em>人</q>
              </li>
              <li className="g-line">
                <span className="g-u">已 完 成  </span>
                <q className="g-lastu"><em className="c1">{data.connect_complete}</em>人</q>
              </li>
            </ul>
          </div>
          <div className="item-3">
            <ul>
              <li className="g-line">
                <span className="tit g-u"><i className="c1"></i>最短通话时长 </span>
                <q className="result">{data.talktime_min}</q>
              </li>
              <li className="g-line">
                <span className="tit g-u"><i className="c2"></i>最长通话时长 </span>
                <q className="result">{data.talktime_max}</q>
              </li>
              <li className="g-line">
                <span className="tit g-u"><i className="c3"></i>平均通话时长 </span>
                <q className="result">{data.talktime_avg}</q>
              </li>
            </ul>
          </div>
          <div className="item-4">
            <ul>
              <li className="g-line g-line-1">
                <span className="tit g-u"><i></i>通话1分钟以下</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_1 / max + "%"}}></em></span>
                <q className="result g-lastu">{data.talksection_1}个</q>
              </li>
              <li className="g-line g-line-2">
                <span className="tit g-u"><i></i>通话1-3分钟</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_2 / max + "%"}}></em></span>
                <q className="result g-lastu">{data.talksection_2}个</q>
              </li>
              <li className="g-line g-line-3">
                <span className="tit g-u"><i></i>通话3-5分钟 </span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_3 / max + "%"}}></em></span>
                <q className="result g-lastu">{data.talksection_3}个</q>
              </li>
              <li className="g-line g-line-4">
                <span className="tit g-u"><i></i>通话5分钟以上</span>
                <span className="schedule g-u"><em
                  style={{width: 100 * data.talksection_4 / max + "%"}}></em></span>
                <q className="result g-lastu">{data.talksection_4}个</q>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
