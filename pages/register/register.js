Page({

  /**
   * 页面的初始数据
   */
  data: {
    templateName:" ", //存放模板名称
    newTemplateName:"", //存放需要data数据的模板名称
    templateName2:"",   //存放订单页面模板名称
    templateName3:"",
    tetx: null,        //存放form
    site:""     ,     //存放修改的地址
    task1:[],           //存放待处理任务信息
    task2:[],         //存放完成的订单信息
    commodity1:[],
    commodity2:[],
    pack1:1,
    pack2:0,
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6Im8zbFJPNWVaRXB1OFNDWlh1WFlUVnpjSzNmYWsiLCJleHAiOjE1NzE4Mzk2ODIsImVtYWlsIjoiIn0.iZhP8p9DnaBLTvWsZPJ5C1k3pSlbV8B1-0fbh39BBPk"
  },

  onLoad: function (options) {
    // this.setData({templateName:options.id})
    // 判断id是否没有参数，如果没有就把修改地址赋值，显示修改地址页面，有id就隐藏起来
    switch (options.id)
    {
      case "register" :
      case "opinion":
      case "relation":
      case "my":
        this.setData({ templateName: options.id })
        break;
    }
    if (options.id.indexOf("modification") != -1)
    {
     this.setData({newTemplateName: options.id})
    } 
    else if (options.id.indexOf("order") != -1)
    {
      this.setData({ templateName2: options.id})
    } 
    else if (options.id.indexOf("await") != -1)
    {
      this.setData({ templateName3: options.id })
    }
    else if (options.id.indexOf("all") != -1)
    {
      this.setData({ templateName3: options.id })
    }
    //订单页面请求数据 ------------------------------------------------------------------------------------------------------------------
    
// 少·1=---------------------------------------------------------------------------------------------------------------------------------------
  },
  //跑手注册form信息提交
  menu:function(e)
  {
    var that=this;
    //显示提示框
    if (e.detail.value.name == "" || e.detail.value.phone == "" || e.detail.value.studentNumber == "")
    {
      //判断数据为空，提示错误
      wx.showToast({
        title: '请输入正确的数据',
        icon: 'info',
        duration:1500
      })
    }
    else if (e.detail.value.name != "" && e.detail.value.phone != "" && e.detail.value.studentNumber != "" )
    {
      //进行服务器请求
      wx.request({
        url: 'http://49.235.182.60/runner/', //仅为示例，并非真实的接口地址
        data: {
          mobile: e.detail.value.phone,
          student_id: e.detail.value.studentNumber,
          name: e.detail.value.name
        },
        method:"post",
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          console.log(res.data)
        }
      })
      //判断输入成功，显示提示框
      wx.showLoading({
        title:"正在提交",
        mask:true,
        success: function () {
          setTimeout(function () {
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              duration: 1500
            })
          }, 2000)
        }
      })
    }
   
    
  },


 //意见反馈form信息提交
  opinion:function(e)
{
  var that = this;
  //显示提示框
  if (e.detail.value.opinion == "" || e.detail.value.texts == "") {
    //判断数据为空，提示错误
    wx.showToast({
      title: '请输入正确的数据',
      icon: 'info',
      duration: 1500
    })
  }
  else if (e.detail.value.opinion != "" && e.detail.value.texts != "") {
    //进行数据提交
    wx.request({
      url: 'http://49.235.182.60/msg/', //仅为示例，并非真实的接口地址
      data: {
        email: e.detail.value.opinion,
        content: e.detail.value.texts
      },
      method: "post",
      header: {
        'Authorization': "JWT " + that.data.token
      },
      success(res) {
        console.log(res.data)
      }
    })
    //判断输入成功，显示提示框
    wx.showLoading({
      title: "正在提交",
      mask: true,
      success: function () {
        that.setData({
          tetx: e.detail.value
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
  } 
},

  //修改地址的表单提交
  modification:function(e)
  {
    var that = this;
    if (e.detail.value.address == "" || e.detail.value.phoneNumber == "") {
      wx.showToast({
        title: '请输入正确的数据',
        icon: 'info',
        duration: 1500
      })
    }
    else if (e.detail.value.address != "" && e.detail.value.phoneNumber != "") {
      //进行数据提交
      wx.request({
        url: 'http://49.235.182.60/address/', //仅为示例，并非真实的接口地址
        data: {
          address: e.detail.value.address,
          signer_name: "tt",
          signer_mobile: e.detail.value.phoneNumber
        },
        method: "post",
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          console.log(res.data)
        }
      })
      //显示提示框
      wx.showLoading({
        title: "正在提交",
        mask: true,
        success: function () {
          that.setData({
            tetx: e.detail.value
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
    } 
  },

  //联系客服的表单提交
  service:function(e)
  {
    var that = this;
    if (e.detail.value.text == "") {
      wx.showToast({
        title: '请输入正确的数据',
        icon: 'info',
        duration: 1500
      })
    }
    else if (e.detail.value.text != "") {
      //提交客服信息
      wx.request({
        url: 'http://49.235.182.60/msg/', //仅为示例，并非真实的接口地址
        data: {
          email: "3148264655@qq.com",
          content: e.detail.value.text
        },
        method: "post",
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          console.log(res.data)
        }
      })
      //显示提示框
      wx.showLoading({
        title: "正在提交",
        mask: true,
        success: function () {
          that.setData({
            tetx: e.detail.value
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
    } 
  },

 //获取地址权限
  address:function()
  {
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
    },

      //订单页面的函数
    //处理订单页面待处理和全部跳转
    pack1:function()
    {
      // this.setData({ pack1: e.currentTarget.dataset.id})
      this.setData({ pack2: 0}),
      this.setData({ pack1: 1 })
    },

  pack2: function () {
    // this.setData({ pack1: e.currentTarget.dataset.id})
    this.setData({ pack2: 1 }),
    this.setData({ pack1:  0})
  },

  //对于待处理，全部订单传递id进行判断请求数据
  onShow: function () {
    //判断是否是待处理订单模板请求数据
    if (this.data.templateName3 == "await")
    {
      var that = this;
      //这个是请求待处理任务
      wx.request({
        url: 'http://49.235.182.60/usertask/?task_status=1',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].task.release_task)
          }
          that.setData({
            task1: new_arr
          })
          console.log(that.data.task1)
        }
      })
      //这个是请求待处理商品
      wx.request({
        url: 'http://49.235.182.60/order/?order_status=1',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].goods)
          }
          that.setData({
            commodity1: new_arr
          })
          console.log(that.data.commodity1)
        }
      })  
    }
    //判断是否是完成订单模板请求数据
    else if (this.data.templateName3 == "all")
    {
      var that = this;
      //这个是请求待完成任务
      wx.request({
        url: 'http://49.235.182.60/usertask/?task_status=2',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].task.release_task)
          }
          that.setData({
            task2: new_arr
          })
          console.log(res)
        }
      })
      //这个是请求完成商品
      wx.request({
        url: 'http://49.235.182.60/order/?order_status=2',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].goods)
          }
          that.setData({
            commodity2: new_arr
          })
          console.log(res)
        }
      })  
    }//判断是否是订单模板请求数据，要请求两种数据
    else if (this.data.templateName2 =="order")
    {
      //这是请求待处理订单信息数据
      var that = this;
      wx.request({
        url: 'http://49.235.182.60/usertask/?task_status=1',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].task.release_task)
          }
          that.setData({
            task1: new_arr
          })
        }
      })
       //这是全部订单信息数据
      wx.request({
        url: 'http://49.235.182.60/usertask/?task_status=2',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].task.release_task)
          }
          that.setData({
            task2: new_arr
          })
        }
      })
      //请求待处理的商品数据
      wx.request({
        url: 'http://49.235.182.60/order/?order_status=1',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].goods)
          }
          that.setData({
            commodity1: new_arr
          })
          console.log(that.data.commodity1)
        }
      })  
      //请求完成商品数据数据
      wx.request({
        url: 'http://49.235.182.60/order/?order_status=2',
        header: {
          'Authorization': "JWT " + that.data.token
        },
        success(res) {
          var new_arr = [];
          for (var i = 0; i <= res.data.length - 1; i++) {
            new_arr.push(res.data[i].goods)
          }
          that.setData({
            commodity2: new_arr
          })
          console.log(res)
        }
      }) 
    }
  },

 
})