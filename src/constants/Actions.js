/**
 * Created by zhouzhen on 2017/4/19.
 */
export function ADD_loadNum() { //加载loading显示 +1
  return {
    type: "ADD_loadNum",
  }
}

export function DEL_loadNum() { //加载loading隐藏 -1
  return {
    type: "DEL_loadNum",
  }
}

export function postData(url, data, fn, noFn, isAsync, type) {//封装Ajax
  return function (dispatch, getState) {
    if (!url) {
      return
    }
    !data.noLoad && dispatch(ADD_loadNum());
    $.ajax({
      type: data.ajaxType || type || 'GET',
      url: url,
      data: data,
      async: isAsync !== undefined ? isAsync : true,
      success: function (res) {
        var res = (typeof res == 'string') ? JSON.parse(res) : res;
        if (res.result.code == 0) {
          fn ? fn(res) : alert('操作成功');
        } else {
          noFn ? noFn(res) : alert(res.result.message);
        }
        !data.noLoad && dispatch(DEL_loadNum());
      }
    })
  }
}
/**
 * Home页结果日期action
 */
export function CHANGE_resultDate(date) {//改变日期
  return function (dispatch, getState) {
    if (getState().resultDate === date) {
      return;
    }
    dispatch({
      type: "CHANGE_resultDate",
      value: date,
    });
    dispatch(telstatresultAjax(date));
  }
}

export function telstatresultAjax(date) {//发起ajax
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/telstatresult/', {
      citycode: window.xkTel.citycode,//城市编号
      level: window.xkTel.level,
      group_id: window.xkTel.group_id,//部组id
      jobid: window.xkTel.jobid,//销售工号
      start_date: date,
      end_date: date
    }, function (res) {
      dispatch(GET_telstatresult(res.result.data));
    }));
  }
}

export function GET_telstatresult(data) {//渲染数据
  return {
    type: "GET_telstatresult",
    value: data,
  }
}
/**
 * Home页结果日期action End
 */

export function CHANGE_callblock(block) {
  return {
    type: "CHANGE_callblock",
    block: block,
  }
}

export function CHANGE_listNum(data) {
  return {
    type: "CHANGE_listNum",
    value: {
      queuenum: data.queuenum, //待呼数
      callnum: data.callnum, // 已呼数
      locknum: data.locknum,   // 锁定数
    }
  }
}

export function CHANGE_uncallRes(data) {
  return {
    type: "CHANGE_uncallRes",
    value: data,
  }
}

export function uncallAjax(param) {
  return function (dispatch, getState) {
    dispatch(postData('/saleajax/tellist/', Object.assign({}, getState().uncallData, param), function (res) {
      const data = res.result.data;
      dispatch(CHANGE_listNum(data));
      dispatch(CHANGE_uncallRes(res.result.data));
    }))
  }
}

export function CHANGE_uncallData(param) {
  return function (dispatch, getState) {
    dispatch({
      type: "ADD_uncallData",
      param: param,
    });
    dispatch(uncallAjax());
  }
}



