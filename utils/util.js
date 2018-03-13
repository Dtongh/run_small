var api = require('api.js')


// 时间戳转换
function timestampToTime(timestamp) {
  let Y = '', M = '', D = '', h = '', m = '', s = '';
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  Y = date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  D = (date.getDate() < 10 ? '0' + date.getDate() + ':' : date.getDate() + ':');
  h = (date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':');
  m = (date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':');
  s = (date.getSeconds() < 10 ? '0' + date.getSeconds() + ':' : date.getSeconds() + ':');
  return Y + M + D + h + m + s;
}
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function alert(msg) {
  wx.showToast({
    title: msg,
    duration: 3000
  })
}

 
// 数组下标取值转换
function typename_to_index(name) {
  let ret = (Object.getOwnPropertyNames(types))
  let index = 0
  ret.forEach(function (v) {
    if (types[v] === name) {
      index = v;
    }
  })
  return index
}

function index_to_typename(index) {
  return types[index]
}


function check(act,val,text) {

  var val = val.trim();
  if (act=='email'){
    var role = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (role.test(val) == false) {
      wx.showToast({
        title: text,
        image: '/images/model.png',
        icon: 'success',
        duration: 2000
      })
    };
   
  } else if(act=='tel'){
    var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    var isMob = /^((\+?86)|())?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;

    if (isMob.test(val) || isPhone.test(val)){

    }else{
      wx.showToast({
        title: text,
        image: '/images/model.png',
        icon: 'success',
        duration: 2000
      })
    }

  }else if(act=='url'){
    var role = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
    
    
    if (role.test(val) == false) {
      wx.showToast({
        title: text,
        image: '/images/model.png',
        icon: 'success',
        duration: 2000
      })
    };
  }else if(act=='text'){
    var str = "[@/'\"#~`$%&+^！!S=*]+";
    var reg = new RegExp(str);
    if (reg.test(val)) {
      wx.showToast({
        title: '不能含有特殊字符',
        image: '/images/model.png',
        icon: 'success',
        duration: 2000
      })
    } 
  }else if(act=='qq'){


    console.log('qq')
    var str = RegExp(/^[1-9][0-9]{4,9}$/);
    
    if (!str.test(val)) {

      
      wx.showToast({
        title: 'QQ格式有误',
        image: '/images/model.png',
        icon: 'success',
        duration: 2000
      })
    } 
  }
}

function buttonClicked(self) {
  self.setData({
    buttonClicked: true
  })
  setTimeout(function () {
    self.setData({
      buttonClicked: false
    })
  }, 500)
}



module.exports = {
  formatTime: formatTime,
  alert: alert,
  typename_to_index: typename_to_index,
  index_to_typename: index_to_typename,
  check: check,
  buttonClicked,
  timestampToTime,
 
}
