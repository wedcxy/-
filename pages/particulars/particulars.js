// pages/particulars/particulars.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodity:{} , //存放传递过来的数据
    a:null,         //存放商品单价
    b:null,         //存放变化的金额
    num:null  ,     //存放商品数量
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk",
  },
  onLoad: function (options) {
    this.setData({ commodity: options})
    this.setData({ a: options.goods_price*100})
    this.setData({ b: options.goods_price * 100 })
  },
  //监听商品数量变化
  onChange(event)
  {
    this.setData({ num: event.detail})
    this.setData({b:event.detail*this.data.a})
  },
  //提交下单商品信息
  onSubmit()
  {
    var that=this;
    wx.request({
      url: 'http://49.235.182.60/order/?order_status=1',
      data:{
        num:this.data.num,
        order_status:1,
        moneny:this.data.b/100,
        goods:this.data.commodity.id
      },
      method:"post",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        console.log(res)
      }
    })
    //显示提示框
    wx.showLoading({
      title:'正在下单中',
      mask:true,
      //成功调用
      success()
      { 
        //定时器控制提示框的隐藏
        setTimeout(function () {
          //提示框隐藏
          wx.hideLoading()
          //跳转支付二维码页面
          wx.navigateTo({
            url: '../payment/payment',
          })
        }, 1000)
      }
    })
  }
})