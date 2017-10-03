// pages/editor/editor.js
const app = getApp()
const utils = require('../../utils/util')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid: 'wxdccebe3153761bb1',
    secret: '3bfa24337a973994248913954788a048',
    submitText: '发红包',
    userInfo: {},
    hasUserInfo: false,
    wordCount: 0,
    maxLength: 100,
    seconds: 0,
    money: null,
    count: null,
    totalMoney: 0,
    serverMoney: 0.01,
    classIcon: 'icon-no',
    text: '',
    imagePic: 'http://mini.0315678.cn/red-packet/img/pic.png',
    imageVol: 'http://mini.0315678.cn/red-packet/img/vol.png',
    micImg: 'https://mini.0315678.cn/red-packet/img/mic-1.png',
    showMic: false,
    timer: null,
    voice: null,
    picture: '',
    submitColor: '#d84e43',
    arr: ['https://mini.0315678.cn/red-packet/img/mic-1.png', 'https://mini.0315678.cn/red-packet/img/mic-2.png', 'https://mini.0315678.cn/red-packet/img/mic-3.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
            }
          })
        }
      }
    })


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
          wx.hideLoading();
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        },
        fail: (err) => {
          if (/443/.test(err.errMsg)){
            return;
          }
          wx.hideLoading();
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    var self = this;
    if (app.globalData.picture) {
      // 防止页面返回重复上传
      if (app.globalData.picture === this.data.picture) {
        return;
      }
      wx.uploadFile({
        url: 'http://127.0.0.1:3000',
        filePath: app.globalData.picture,
        name: 'picture',
        success: (res) => {
          this.setData({
            picture: app.globalData.picture
          }, () => {
            wx.hideLoading()
          })
        }
      });
      wx.showLoading({
        title: '上传中'
      })
    }
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
  onInputWrite(e) {
    this.data.wordCount = e.detail.value.length;
    this.setData({
      wordCount: this.data.wordCount,
      text: e.detail.value
    })
  },
  onInputMoney(e) {
    let money = e.detail.value;
    if (money > 60) {
      money = 60;
    }
    this.setData({
      money: money,
      totalMoney: money * (1 + this.data.serverMoney)
    })
    if (money != 0) {
      this.setData({
        submitText: `还需要支付${money}元`
      })
    } else {
      this.setData({
        submitText: `发红包`
      })
    }
  },
  onInputCount(e) {
    let count = e.detail.value;
    if (count > 60) {
      count = 60;
    }
    this.setData({
      count: count
    })
  },
  onInputSeconds(e) {
    let seconds = e.detail.value;
    if (seconds > 60) {
      seconds = 60;
    }
    this.setData({
      seconds: seconds
    })
  },
  onTapDecreaseSecond(e) {
    let seconds = this.data.seconds - 1;
    if (seconds < 0) {
      seconds = 0
    }
    this.setData({
      seconds: seconds
    })
  },
  onTapAddSecond() {
    let seconds = Number(this.data.seconds) + 1;
    if (seconds > 60) {
      seconds = 60
    }
    this.setData({
      seconds: seconds
    })
  },
  //  点击支付
  onTapCash() {
    
    
    let self = this;
    let appid = this.data.appid;
    let secret = this.data.secret;

    let text = this.data.text ? this.data.text : '恭喜大家红包拿来';
    let money = this.data.money;
    let count = this.data.count;
    let seconds = this.data.seconds;
    let userInfo = app.globalData.userInfo;
    if (!money) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '你必须花钱'
      })
      return;
    }

    if (!count) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入红包总数'
      })
      return;
    }
    wx.showLoading({
      title: '请稍后'
    });
    this.setData({
      submitColor: '#bf2b1f'
    })
    wx.login({
      success: (res) => {
        let data = utils.jsonForm({
          code: res.code,
          money: money,
          count: count,
          gender: userInfo.gender,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          city: userInfo.city,
          time: seconds
        });
        wx.request({
          url: 'https://mini.0315678.cn/hb/index.php/home/Upload/pay',
          data: data,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: (res) => {
            this.setData({
              submitColor: '#d84e43'
            })
            wx.hideLoading();
            wx.requestPayment({
              'timeStamp': res.data.timeStamp,
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': res.data.signType,
              'paySign': res.data.paySign,
              'success': function (res) {
                wx.request({
                  url: url,
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  data: utils.jsonForm({
                    content: text,
                    flag: '1'
                  }),
                  success: (res) => {
           
                  }
                })
              },
              'fail': function (res) {
          
              }
            })
          }
        })
        // wx.navigateTo({
        //   url: '/pages/preview/preview',
        // })
      }
    })
  },
  onTapChoosePay() {
    if (this.data.classIcon == 'icon-no') {
      this.setData({
        classIcon: 'icon-ok'
      })
    } else {
      this.setData({
        classIcon: 'icon-no'
      })
    }
  },
  onTapPhoto() {
    // const self = this

    // wx.chooseImage({
    //   count: 1, // 默认9
    //   success(res) {
    //     self.setData({
    //       showCanvas: true
    //     });
    //     let src = res.tempFilePaths[0]
    //     //  获取裁剪图片资源后，给data添加src属性及其值
    //     console.log(self.wecropper)
    //     self.wecropper.pushOrign(src)
    //   }
    // })
    wx.chooseImage({
      count: 1,
      success: function(res) {
        let tempFilePath = res.tempFilePaths[0];
        wx.navigateTo({
          url: '/pages/cutInside/cutInside?tempFilePath=' + tempFilePath
        })
      },
    })
    
  },
  uploadPhoto(url, filePath) {
    var uploadTask = wx.uploadFile({
      url: url, //仅为示例，非真实的接口地址
      filePath: filePath,
      name: 'file',
      success: function (res) {
        var data = res.data
        console.log(res);
      }
    })
    return uploadTask;
  },
  // 开始录音
  onStartVoice() {
    var self = this;
    wx.getSetting({
      success: (res) => {
        console.log(res.authSetting['scope.record'])
        if (!res.authSetting['scope.record']){
          wx.showModal({
            title: '提示',
            content: '你得授权才能说话',
            showCancel: false,
            success: () => {
              wx.openSetting({
            
          }) 
            }
          })
        }else{
          wx.startRecord({
            success: (res) => {
              wx.uploadFile({
                url: 'https://mini.0315678.cn/hb/index.php/Home/Hb/upvoi',
                filePath: res.tempFilePath,
                name: 'voice',
                success: (res) => {
                  self.setData({
                    imageVol: 'https://mini.0315678.cn/red-packet/img/voiced.png'
                  }, () => {
                    wx.hideLoading();
                  })
                }
              });
              wx.showLoading({
                title: '上传中',
              })
            }
          })
          let arr = ['https://mini.0315678.cn/red-packet/img/mic-1.png', 'https://mini.0315678.cn/red-packet/img/mic-2.png', 'https://mini.0315678.cn/red-packet/img/mic-3.png'];
          this.setData({
            showMic: true
          });

          var i = 1;
          this.data.timer = setInterval(() => {
            this.setData({
              micImg: arr[(i % 3)]
            })
            i++;
          }, 1000);
          this.setData({
            timer: this.data.timer
          })
        }
      }
    })
    
    
  },
  onEndVoice() {
    wx.stopRecord();
    clearInterval(this.data.timer);
    this.setData({
      showMic: false
    })
  }
})


