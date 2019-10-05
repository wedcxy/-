// pages/payment/payment.js
Page({
  clickzf(){
        wx.previewImage({
          current: 'http://49.235.182.60/media/ZF.png', // 当前显示图片的http链接
          urls: ["http://49.235.182.60/media/ZF.png", "http://49.235.182.60/media/ZF.png"] // 需要预览的图片http链接列表
        })
  }
})