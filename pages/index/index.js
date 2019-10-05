//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    snacks:[],  //存放零食数据
    beverages:[], //存放饮料数据
    fruits:[],   //存放水果数据
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk",
  },
  onLoad: function (options) {
    var that=this;
    //请求零食数据 ---------------------------
     wx.request({
       url: "http://49.235.182.60/goods/?good_type=2",
       header: {
         'Authorization': "JWT " + that.data.token
       },
       success(res) {
         var new_arr = [];
         for (var i = 0; i <= res.data.length - 1; i++) {
           new_arr.push(res.data[i])
         }
         that.setData({
           snacks: new_arr
         })
       }
     })
    //请求饮料数据 -----------------------------------------------
    wx.request({
      url: "http://49.235.182.60/goods/?good_type=1",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          beverages: new_arr
        })
      }
    })
    //请求水果数据 --------------------------------------------
    wx.request({
      url: "http://49.235.182.60/goods/?good_type=3",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          fruits: new_arr
        })
      }
    })
  },


  //4个导航条的导航事件
  click1: function () {
    wx.navigateTo({
      url: '../errand/errand',
    })
  },
  click2: function () {
    wx.navigateTo({
      url: '../partTime/partTime',
    })
  },
  click3: function () {
    wx.navigateTo({
      url: '../register/register?id=order',
    })
  },
  click4: function () {
    console.log("11")
    wx.navigateTo({
      url: '../register/register?id=opinion'
    })
  },

  //点击商品跳转到商品详情页面,并且带上数据
  commodity:function(e)
  {
    var $id = e.currentTarget.dataset;
    console.log(e)
    wx.navigateTo({
      url: '../particulars/particulars?name=' + $id.name + "&goods_price=" + $id.goods_price + "&goods_front_image=" + $id.goods_front_image+"&id="+$id.id
    })
  },
  //下拉刷新页面
  onPullDownRefresh: function () {
    var that = this;
    //请求零食数据 ---------------------------
    wx.request({
      url: "http://49.235.182.60/goods/?good_type=2",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          snacks: new_arr
        })
        console.log(that.data.snacks)
      }
    })
    //请求饮料数据 -----------------------------------------------
    wx.request({
      url: "http://49.235.182.60/goods/?good_type=1",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          beverages: new_arr
        })
      }
    })
    //请求水果数据 --------------------------------------------
    wx.request({
      url: "http://49.235.182.60/goods/?good_type=3",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        var new_arr = [];
        for (var i = 0; i <= res.data.length - 1; i++) {
          new_arr.push(res.data[i])
        }
        that.setData({
          fruits: new_arr
        })
      }
    })
    wx.showToast({
      title: '数据已经最新',
      icon: 'success',
      duration: 2000
    })
  },
})
