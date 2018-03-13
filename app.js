//app.js
var data = require('utils/post_data.js')
var utils = require('utils/util.js');
var api = require('utils/api.js');
var app = getApp();
App({
  onLoad:function(){
    console.log("App onLoad")
    
  },
  onLaunch: function () {
    var that = this;

    // api.record()
   //登录成功的回调 登录失败的回调 弹出的确认框文案 初次授权时调用弹窗
    
    
    // console.log("App OnLaunch")
    // wx.getUserInfo({
    //   success: function (user) {
    //     // console.log(user)
    //     // this.setglobalData({
    //     //   userInfo :user.userInfo
    //     // })
    //     that.globalData.userInfo = user.userInfo
    //   }
    // })
    
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
}
})