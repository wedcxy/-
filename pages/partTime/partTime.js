Page({
  data: {
    name: "", //存放兼职发布人名字
    phone: "", //存放兼职发布人手机号码
    message: "", //存放描述信息
    price: "", //存放兼职价格
    parttime: [], //存放从接口请求过来的数据
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk"
  },
  onLoad: function(options) {
    //请求获取兼职信息列表进行渲染
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/parttime/',
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          parttime: new_arr
        })
        console.log(that.data.parttime)
      }
    })
  },
  //进行赋值的封装函数
  on(e) {
    this.setData({
      [e.target.dataset.name]: e.detail.detail.value
    });
  },
  //发布兼职任务
  onSubmit: function() {
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/parttime/',
      data: {
        moblie: this.data.phone,
        username: this.data.name,
        describe: this.data.message,
        money: this.data.price,
        jon_num: 1,
        job_type: 1
      },
      method:"post",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        console.log(res)
        //显示提示框
        wx.showLoading({
          title: '正在提交',
          mask: true,
        })
        //隐藏提示框
        //定时器控制提示框的隐藏
        setTimeout(function () {
          //提示框隐藏
          wx.hideLoading()
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 800
          })
        }, 1000)
      }
    })

    //点击请求新的数据，在页面渲染最新的数据
    //请求获取兼职信息列表进行渲染
    var that = this;
    wx.request({
      url: 'http://49.235.182.60/parttime/',
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          parttime: new_arr
        })
        console.log(that.data.parttime)
      }
    })
  }
})