// pages/profile/profile.js
const db = wx.cloud.database(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick:"",
    head:"",
    gender:"",
    info:"../../images/comment.png",//评论切换的图片
    collect: "../../images/icon3.png",//收藏切换的图片
    show: false

  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

goInfo(){//跳转页面
   wx.navigateTo({
     url: '/pages/mymovie/mymovie',
   })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取用户信息
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var userInfo = res.userInfo;
        that.setData({
          nick: userInfo.nickName,
          head: userInfo.avatarUrl,
          gender: userInfo.gender == 1 ? "../../images/nan.png" : "../../images/nv.png",
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
    console.log(2)
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