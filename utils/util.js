const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const showModal = (callback) => {
  wx.showModal({
    title: '用户授权失败',
    content: '请允许授权秀我小程序获取您的用户信息，这样才能正常使用本软件的功能，确定后请在下个页面打开开关',
    showCancel: false,
    success: () => {
      wx.openSetting({
        success: (res) => {
          var userInfo = res.authSetting['scope.userInfo'];
          if (userInfo) {
            wx.getUserInfo({
              success: (res) => {
                callback(res.userInfo)
              }
            })
          } else {
            showModal(callback)
          }
        }
      })
    }
  })
}
const jsonForm = (json) => {
  var str = [];
  for(var p in json){
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]));
  }
  return str.join('&');
}

module.exports = {
  formatTime: formatTime,
  showModal: showModal,
  jsonForm: jsonForm
}
