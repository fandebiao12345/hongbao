// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    left: '18.6%',
    colorSend: '#d95940',
    colorGet: '',
    clientHeight: 0,
    current: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          clientHeight: res.windowHeight
        })
      }
    })
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
  onTapSend () {
    console.log(1)
    this.setData({
      current: 0
    })
  },
  onTapGet() {
    console.log(0)
    this.setData({
      current: 1
    })
  },
  currentChange (e) {
    let current = e.detail.current;
    if (current === 0){
      this.setData({
        left: '18.6%',
        colorSend: '#d95940',
        colorGet: ''
      })
    } else if (current === 1) {
      this.setData({
        left: '68.6%',
        colorSend: '',
        colorGet: '#d95940'
      })
    }
  }
})