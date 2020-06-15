// pages/movelist/movelist.js
//获取用户发表的喜欢的电影和图片
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],//添加一个属性list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  

    db.collection("myphoto").get().then(res => {
      this.setData({
        list: res.data,//保存查询结果
        value2:res.data.score
      })
      console.log(this.data);
    }).catch(err => {
      console.log(err);
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