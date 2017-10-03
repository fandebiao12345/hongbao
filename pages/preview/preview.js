// pages/preview/preview.js
const app = getApp()
const utils = require('../../utils/util')
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    totalMoney: 20,
    height: '0',
    open: false,
    hasGet: false,
    contentHeight: 'auto',
    isnoWrap: 'nowrap',
    realContentHeight: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setContentHeight();


    var self = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else {
      wx.hideLoading();
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        },
        fail: () => {
          utils.showModal((userInfo) => {
            app.globalData.userInfo = userInfo;
            self.setData({
              userInfo: userInfo,
              hasUserInfo: true
            });
          })
        }
      })
    }
  },
  onReady() {

  },
  onTapOpen() {
    this.setData({
      open: true,
      contentHeight: this.data.realContentHeight + 'px',
      isnoWrap: 'wrap'
    })
  },
  onTapClose() {
    this.setData({
      open: true,
      contentHeight: '42rpx',
      open: !this.data.open
    });
    setTimeout(() => {
      this.setData({
        isnoWrap: 'nowrap'
      })
    }, 500)
  },
  // 获取content高度
  setContentHeight() {
    var query = wx.createSelectorQuery();
    var content = query.select('#content');
    content.boundingClientRect((rect) => {
      var h = rect.height;

      this.setData({
        contentHeight: '42rpx',
        realContentHeight: h
      })
    }).exec();
  },
  // 转发事件
  onShareAppMessage: function (res) {
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }
    // return {
    //   title: `${this.data.userInfo.nickName}的红包`,
    //   path: '/page/user?id=123',
    //   imageUrl: this.data.userInfo.avatarUrl,
    //   success: function (res) {
    //     // 转发成功
    //   },
    //   fail: function (res) {
    //     // 转发失败
    //   }
    // }
  }
})
