//index.js
//获取应用实例
const app = getApp()
const utils = require('../../utils/util')
Page({
  data: {
    scrollY: true,
    userInfo: {},
    hasUserInfo: false,
    totalMoney: 20,
    seconds: 30,
    buttonClass: 'button-time',
    height: '0',
    open: false,
    animationData: null,
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
      this.startTime();
    } else {
      wx.getUserInfo({
        success: res => {
          wx.hideLoading();
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          this.startTime();
        },
        fail: () => {
          // 判断是否有网或没网
          if (/443/.test(err.errMsg)) {
            return;
          }
          wx.hideLoading();
          utils.showModal((userInfo) => {
            app.globalData.userInfo = userInfo;
            self.setData({
              userInfo: userInfo,
              hasUserInfo: true
            });
            self.startTime();
          })
        }
      })
    }
  },
  onReady() {

  },
  onTapStart() {

    //if(this.data.seconds == '抢'){
    this.setData({
      hasGet: true
    })
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    animation.rotateY(360).step();
    this.setData({
      animationData: animation.export()
    })
    if (this.data.hasGet) {
      wx.navigateTo({
        url: '/pages/result/result',
      })
      return;
    }
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/result/result',
      })
    }, 1000)
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
    
    setTimeout(()=>{
      this.setData({
        isnoWrap: 'nowrap'
      })
    }, 1000)
  },
  // 开始计时
  startTime() {
    let timer = setInterval(() => {
      if (this.data.seconds === 1) {
        clearInterval(timer);
        this.setData({
          seconds: '抢',
          buttonClass: 'button-start'
        })
        return;
      }
      this.data.seconds -= 1;
      this.setData({
        seconds: this.data.seconds
      })
    }, 1000)
  },
  setContentHeight () {
    var query = wx.createSelectorQuery();
    var content = query.select('#content');
    content.boundingClientRect((rect) => {
      var h = rect.height + 50;

      this.setData({
        contentHeight: '42rpx',
        realContentHeight: h
      })
    }).exec();
  }
})
