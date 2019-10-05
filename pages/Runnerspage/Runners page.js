// pages/Runnerspage/Runners page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: [],
    task2: [],
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk",
    name:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/runtask/?task_status=1',
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i].release_task)
        }
        that.setData({
          task: new_arr
        })
        // console.log(res.data[0].release_task)
        console.log(that.data.task)
      }
    })
    // ------------------------------------------------------------------------------------------
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/runtask/?task_status=2',
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i].release_task)
        }
        that.setData({
          task2: new_arr
        })
      }
    })


    // -------------------------------------------
    wx.request({
      url: 'http://49.235.182.60/runner/1/',
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        that.setData({
          name: res.data.name
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

  }
})