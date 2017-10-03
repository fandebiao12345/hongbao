// pages/balance /balance.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: 88.88,
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  // 监听用户输入金额是否大于账号余额
  onInputNum (e) {
    if (e.detail.value > this.data.balance){
      this.setData({
        value: this.data.balance
      })
    }
  },
  // 用户提现
  onTapGet () {
    wx.showLoading({
      title: '加载中'
    })
    wx.login({
      success: (res) => {
        let userInfo = app.globalData.userInfo;
        let code = res.code;
        wx.request({
          url: 'https://mini.0315678.cn/hb/index.php/home/index/',
          data: {
            code: code
          },
          success: (res) => {
            wx.hideLoading();
            wx.showToast({
              title: '零钱已到账',
              showCancel: false
            })
          }
        })
      }
    })
  },
  // 全部提现
  onTapTotal () {
    this.setData({
      value: this.data.balance
    })
  }
})