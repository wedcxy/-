
Page({
  data: {
    task:[
      
    ],
    task2:[],//存储请求数据备份，搜索时可以使用
    event: ""   ,               token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk"
  },
   //搜索事件
  onCancel(event)
  {
    var str = event.detail
    //1.0先让备份数据，覆盖展示数据，防止搜索过的数据单一
    this.setData({ task: this.data.tsak2 })
    //1.1创建数组，存储经过搜索过的数组
    var newlist = [];
    //1.2把存储请求数据的数组遍历出来进行判断
    this.data.task2.forEach(item => {
      if (item.task_type.indexOf(str) != -1) {
        newlist.push(item)
        this.setData({ task: newlist })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/task/?task_status=1', // 仅为示例，并非真实的接口地址
      data: {
      },
      method: "get",
      header: {
        //  'content-type': 'application/json',
        'Authorization': "JWT " + that.data.token// 必须加上这个才能取到数据
      },
      success(res) {
       that.setData({ task:res.data})
       that.setData({ task2: res.data})
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/task/?task_status=1', // 仅为示例，并非真实的接口地址
      data: {
      },
      method: "get",
      header: {
        //  'content-type': 'application/json',
        'Authorization': "JWT " + this.data.token // 必须加上这个才能取到数据
      },
      success(res) {
        that.setData({task:res.data})
        that.setData({task2:res.data})
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/task/?task_status=1', // 仅为示例，并非真实的接口地址
      data: {
      },
      method: "get",
      header: {
        //  'content-type': 'application/json',
        'Authorization': "JWT " + this.data.token // 必须加上这个才能取到数据
      },
      success(res) {
        that.setData({
          task: res.data
        })
      }
    })
    wx.showToast({
      title: '数据已经最新',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },
  //页面导航事件
  click:function()
  {
    wx.navigateTo({
      url: "../issue/issue",
    })
  },
  runner:function()
  {
    wx.navigateTo({
      url: '../Runnerspage/Runners page',
    })
  },
  //点击带参数跳转详情页面
  clickTask:function(e)
  {
    var $data=e.currentTarget.dataset;
    wx.navigateTo({
      url: "../task/task?price=" + $data.price + "&desc=" + $data.desc + "&title=" + $data.title + "&address=" + $data.address + "&signer_mobile=" + $data.signer_mobile + "&id=" + $data.id + "&task_type" + $data.task_type
    })
    console.log(e)
  },
})