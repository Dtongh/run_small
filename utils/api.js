/*
  找合作API
*/

const base_url = 'https://www.420csd.com/'
var md5 = require('../utils/md5.js');

function showlog(msg){
 
}

function post(action,data,cb){
  wx.request({
    url: base_url + action,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      cb(res.data)
    }
  })
}
//制保留2位小数，如：2，会在2后面补上00.即2.00 
function tofloor(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
} 

function invoke(action,data,cb){
  showlog('api.js_invoke:' + JSON.stringify(data))
  post(action,data,function(res){
    if(res.status !== 1){
     
      wx.showToast({
        title: res.msg,
        image: '/pages/image/model.png',
        icon: 'success',
        duration: 2000,
        success: function () {
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        }
      })
      
      return;
    }else{
      cb(res.data)
    }
    
  })
}
//公共的登录方法
function login() {
  var that = this
  var sucess = arguments[0] ? arguments[0] : function () { };//登录成功的回调
  var fail = arguments[1] ? arguments[1] : function () { };//登录失败的回调
  var title = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？';//当用户取消授权登录时，弹出的确认框文案
  var init = arguments[3] ? arguments[3] : function () { };//初次授权时调用弹窗

  var user = wx.getStorageSync('user');//登录过后，用户信息会缓存
  if (!user) {
    wx.login({
      success: function (res) {
        var code = res.code;


        let ts = new Date().getTime();
        let appid = '20180101xiaochengxutoken023';
        let sign = appid + ts;
        sign = md5.md5(sign)
        


        
        wx.getUserInfo({
          success: function (userinfo) {
            // console.log(res,'getUserInfo')
            // console.log(userinfo.userInfo, 'userinfo')
            let data = userinfo.userInfo;
            let group = {
              username: data.nickName,
              userimg: data.avatarUrl,
              openid: code,
              gender: data.gender,
              
             
            }
            // console.log(group)
            invoke('User/getuserinfo', {
              username: data.nickName,
              userimg: data.avatarUrl,
              openid: code,
              gender: data.gender,
              'appid': appid,
              'sign': sign,
              'ts': ts,
              
            }, function (res) {
              res.sex = data.gender
              wx.setStorageSync("user", res)//本地缓存user数据   下次打开不需要登录
              let app = getApp()
              app.globalData = res;
              app.globalData.sex = data.gender
             
              sucess(res)
              
              init()
            })
           
 
          },
          fail: function (res) {//用户点了“拒绝”
            wx.showModal({
              title: '提示',
              content: title,
              showCancel: true,
              cancelText: "否",
              confirmText: "是",
              success: function (res) {
                if (res.confirm) {
                  if (wx.openSetting) {//当前微信的版本 ，是否支持openSetting
                    wx.openSetting({
                      success: (res) => {
                        if (res.authSetting["scope.userInfo",'scope.record']) {//如果用户重新同意了授权登录
                          wx.getUserInfo({//跟上面的wx.getUserInfo  sucess处理逻辑一样
                            success: function (userinfo) {
                              let data = userinfo.userInfo;
                              let userInfo = res
                              let group = {
                                username: data.nickName,
                                userimg: data.avatarUrl,
                                openid: code,
                                gender: data.gender,
                                
                               
                              }
                              
                              invoke('User/getuserinfo', {
                                username: data.nickName,
                                userimg: data.avatarUrl,
                                openid: code,
                                gender: data.gender,
                                'appid': appid,
                                'sign': sign,
                                'ts': ts,
                                
                              }, function (res) {
                                wx.setStorageSync("user", res)//本地缓存user数据   下次打开不需要登录
                                let app = getApp()
                                app.globalData = res;
                                app.globalData.sex = data.gender
                                sucess(res)
                                console.log(res, 'userinfo')

                                init()
                              })
                              
                            }
                          })
                        } else {//用户还是拒绝
                          fail() 
                          init()
                        }
                      },
                      fail: function () {//调用失败，授权登录不成功
                        fail()
                        init()
                      }
                    })
                  } else {
                    fail()
                    init()
                  }
                } else {
                  fail()
                  init()
                }
              }
            })
          }
        })
      },
      fail: function (res) {
        fail()
        init()
      }
    })
  } else {//如果缓存中已经存在user  那就是已经登录过
    var app = getApp()
    app.globalData = user

    // console.log(user)
    sucess(user)
  }
}

function record(){


  
  wx.authorize({
    scope: 'scope.record',
    success() {
      console.log("录音授权成功");
      //第一次成功授权后 状态切换为2
      // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      
      
    },
    fail() {
     
      wx.showModal({
        title: '提示',
        content: '您未授权录音，功能将无法使用',
        showCancel: true,
        confirmText: "授权",
        confirmColor: "#52a2d8",
        success: function (res) {
          if (res.confirm) {
            //确认则打开设置页面（重点）
            wx.openSetting({
              success: (res) => {
                
                if (!res.authSetting['scope.record']) {
                  //未设置录音授权
                 
                  wx.showModal({
                    title: '提示',
                    content: '您未授权录音，功能将无法使用',
                    showCancel: false,
                    success: function (res) {

                    },
                  })
                } else {
                  //第二次才成功授权
                  
                 
                }
              },
              fail: function () {
               
              }
            })
          } else if (res.cancel) {
           
          }
        },
        fail: function () {
         
        }
      })
    }
  })
}

module.exports = {
  invoke:invoke,
  login: login,
  record: record,
  tofloor: tofloor
}