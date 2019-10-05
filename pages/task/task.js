const app = getApp()
Page({
  data: {
      task:{}, //接受任务列表某一个数据点击进来内容进行存储
  },
  onLoad: function (options) {
    this.setData({ task: options})
    // console.log(task)
  },
  clickTask:function()
  {
    var that = this
    console.log(that.data.task.id)
    wx.request({
      url: 'http://49.235.182.60/runtask/', //仅为示例，并非真实的接口地址
      data: {
        task_status:1,
        release_task: that.data.task.id
      },
      method:"post",
      header: {
        //  'content-type': 'application/json',
        'Authorization': "JWT " + app.globalData.token // 必须加上这个才能取到数据
      },
      success(res) {
        console.log(res.data)
      }
    })
  }
 
})