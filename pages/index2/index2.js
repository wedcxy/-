// pages/index2/index2.js
// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  
  // 页面按钮触发页面跳转事件
  skip1: function () {
    wx.navigateTo({
      url: '../errand/errand',//这里路径可以传递参数，然后跳转页面就可以在onLoad(options)里面获取数                               据，但是在这里传递数据必须以：key=value的方式写在url里面，然后在另外文                                件获取形式：参数.key来获取传递的数据
    })
  },
  skip2: function () {
    wx.navigateTo({
      url: '../partTime/partTime',
    })
  },
  skip3:function()
  {
    wx.navigateTo({
      url: '../register/register?id=register',
    })
  },
  skip4: function () {
    wx.navigateTo({
      url: '../register/register?id=opinion',
    })
  }
})