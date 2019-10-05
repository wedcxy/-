// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    task: ["取物品", "搬运物品", "其他"], //选择列表：任务
    task2: [5, 10, 15, 20, 25, 30],       //选择金额
    phone:"" ,          //存放手机号码
    index: 0,          //存放选择任务的顺序
    index2: 0,          //存放选择金额的顺序
    site: "",        //存放获取的用户地址
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk"
  },
  onLoad: function (options) {
    
  },
  //表单提交
  menu: function (e) {
    var that = this;
    //判断金额的数组位置进行转化为钱
    if(that.data.index2 == 0)
    {
        that.setData({index2:5})
    } else if (that.data.index2 == 1)
    {
      that.setData({ index2: 10 })
    } else if (that.data.index2 == 2)
    {
      that.setData({ index2: 15 })
    } else if (that.data.index2 == 3)
    {
      that.setData({ index2: 20 })
    } else if (that.data.index2 == 4)
    {
      that.setData({ index2: 25 })
    } else if (that.data.index2 == 5)
    {
      that.setData({ index2: 30 })
    }
    console.log(that.data.index2)
    
      wx.showLoading({
        title: "正在提交",
        mask: true,
        success: function () {
          wx.request({
            url: 'http://49.235.182.60/task/', // 仅为示例，并非真实的接口地址
            data: {
              "signer_mobile": that.data.phone,  //手机号码
              "task_moneny": that.data.index2,  //赏金（整数型）
              "task_type": that.data.index, //留言类型: 1(取物品), 2(搬运工具), 3(其它)
              "address": that.data.site  //地址可为空
            },
            method: "post",
            header: {
              //  'content-type': 'application/json',
              'Authorization': "JWT " + that.data.token // 必须加上这个才能取到数据
            },
            success(res) {
              console.log(res)
            }
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
          }, 2000)
        }
      })
    },
  clickTask: function (e) {
    this.setData({
      index: e.detail.value
    })

  },
  // 存放手机号码
  phone:function(e)
  {
    this.setData({
      phone: e.detail.value
    })
  },
  //选择任务赏金金额
  clickTask2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  //用户授权获取地址
  request: function () {
    var that = this
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          //wx.authorize函数向用户跳出界面，请求获取权限
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户如果同意请求，请求获取地址的界面就不会跳出来
              wx.chooseLocation({
                success(res) {
                  that.setData({
                    site: res.name
                  })
                }
              })
            }
          })
        }
        else {
          wx.chooseLocation({
            success(res) {
              that.setData({
                site: res.name
              })
            }
          })
        }
      }
    })
  }
  ,

})