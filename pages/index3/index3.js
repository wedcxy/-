const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    login: { avatarUrl: "../img/login.png", nickName: "点击登录"}, //没有授权情况下，默认展示的样式
    fun: [{
        id: "?id=modification",
      src: "http://49.235.182.60/media/add.png",
        text: "修改地址"
      },
      {
        id: "?id=relation",
        src: "http://49.235.182.60/media/contact.png",
        text: "联系客服"
      },
      {
        id: "?id=my",
        src: "http://49.235.182.60/media/mess.png",
        text: "我的信息"
      }
    ],
  },
  //登录
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }  
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //wx:for循环给每一个指定路径
  readArticle: function(e) {
    var $id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../register/register' + $id,
    })
  },

  //订单导航事件
  order: function() {
    wx.navigateTo({
      url: '../register/register?id=order',
    })
  },

  //待处理事件
  await: function() {
    wx.navigateTo({
      url: '../register/register?id=await',
    })
  },

  //全部订单导航事件
  pastRecords: function() {
    wx.navigateTo({
      url: '../register/register?id=all',
    })
  },
  //___________________________________

})