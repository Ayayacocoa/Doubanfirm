  // pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {   
    value: 0, 
    value2:"",
    start:0,
    count:20,
    list:[]
  }, 
  //跳转评论主键,带id
  jump: function (event){
    //获取id
    var id=event.target.dataset.id;
    console.log(id);
    //1.创建url
    var url ="/pages/detail/detail?id="+id;
    //2.保存跳转
    wx.navigateTo({
      url: url,
    })
  },
  loadMore:function(){//豆瓣电影函数
      //分页豆瓣电影
      // 1.在data添加两个属性
      // 2.调用云函数
    wx.cloud.callFunction({//豆瓣
      name: "moveList1907",
      data: {
        start:this.data.list.length,
        count: this.data.count
      } 
    }).then(res => { 
      // 3.获取返回结果 
    var rows=JSON.parse(res.result);
    // 4.在data添加list数组 电影列表
    var list=this.data.list.concat(rows.subjects);
    console.log(list);
      // 5.将云函数返回结果保存list
     this.setData(  {
       list: list
     })
    })  
  },
  onChange(event) {//测试
    this.setData({
      value: event.detail
    });
  },
  onChange1(event) {//测试
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  功能:调用云函数tedutest
    // wx.cloud.callFunction({
    //   name: "tedutest"
    // }).then(res => {
    //   console.log(res);
    // });
    this.loadMore();
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})