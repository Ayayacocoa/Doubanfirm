// pages/detail/detail.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   id:0,//当前电影的id
   info:[],
    value1: '',//评论
    value2: "",//评分
    images:[],//选择图片临时路径
    fileids:[],//图片的新路径
    title:"",//电影名
    nick:"",//发表人的昵称
    head:"",//头像
    gender:"",//性别
  },
  onVal1Change(event) {//修改评论内容
    //console.log(1);
    this.setData({
      value1:event.detail
    })
    //console.log(this.data.value1);
  },
  onVal2Change(event) {//修改评分
    this.setData({
      value2: event.detail
    });
  },
  selectImg: function () { 
    //选中图片并且预览图片
    //1：选中九张图片
    wx.showLoading({
      title: '图片上传中。。。',
    })
    wx.chooseImage({
      count:9,//最多选择九张图片
      sizeType:["original","compressed"],//图片类型，原图，压缩图
      sourceType:["album","camera"],//图片来源，相册，相机
      success: (res)=>{
        this.setData({
          //2.选中的临时图片路径保存到images
          images:res.tempFilePaths
          })
        wx.hideLoading(); // 隐藏加载提示框
      },
 //3.在xml中创建循环显示图片
    })
   
    //

  },//上传图片
  // #遇到问题
    // 异步: 缺: 无序  优: 效率
    //   (1)一次上传多张图片          异步[1, 2, 3]
    //     (2)将多张图片fileID保存数据库 异步 结束
    //   #Promise  ES6技术点[将异步操作转换同步]
    //   (1)new Promise((resolve, reject) => { })
    // resolve() 当前任务执行成功，请执行下一个任务
    // reject()  当前任务执行失败
    // #完成上传一张图片任务
    // #创建新文件名 / 上传一张图片 / 将fileID保存
    // #将多个Promise保存数组
    //   (2)Promise.all(数组).then(res => {
    //   #钩子
    //     #获取用户评论
    //     #获取用户评分
    //     #所有图片fileID
    //     #一次性将以上所有数据添加云数据库ok
    //   });
  submit:function(){
    //console.log(4);
    //1上传图片到云存储
    //1.1数据加载中提示框
    wx.showLoading({
      title: '评论中...',
    })
    //1.2创建数组
    var rows=[];
//1.3创建循环变量选择的数组
for(var i=0;i<this.data.images.length;i++){
  //1.4:创建promise对象完成上传一张图片
  rows.push(new Promise((resolve,reject)=>{
//1.5:获取当前图像名字
var item=this.data.images[i];
//1.6拆分字符串获取文件名后缀
var suffix=(/\.\w+$/).exec(item)[0];
//1.7创建新文件名
var newFile=new Date().getTime();
newFile+=Math.floor(Math.random()*9999);
newFile+=suffix;
//1.8上传云存储中
    wx.cloud.uploadFile({
      cloudPath: newFile,//新文件名
      filePath:item,//原文件名
      success: (res) => {
        //console.log(123);
       // console.log(res.fileID);
        //1.9在data中添家一个属性fileids
//1.10上传图片成功将图片fileID保存起来
       this.data.fileids.push(res.fileID);
       //1.11.成功
        resolve();
      }
    })

//1.11.
  }));

}
    //获取用户信息
    var that=this;
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
    //在云数据库创建集合myphoto
    //获取留言,评分,fileids
    Promise.all(rows).then(res => {
        var v1=this.data.value1;
        var v2=this.data.value2;
        var fids=this.data.fileids;
        console.log("----------");
        console.log(v1);
      console.log(v2);
      console.log(fids);
      //3.3向云数据库人添加
      //3.4创建db对象
      db.collection("myphoto").add({
        data:{
          content:v1,
          score:v2,
          fids:fids,
          title:this.data.info.title,
          mid:this.data.id,
          nick: this.data.nick,
          head: this.data.head,
          gender: this.data.gender
        }
      }).then(res=>{
        wx.hideLoading();//隐藏加载提示框
        wx.showToast({
          title: '评论发表成功...',
        })
        wx.navigateTo({
          url: '/pages/movelist/movelist',
        })
      }).catch(err=>{
        console.log(err)
      })
    })
  },//提交评论

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var id=options.id;//获取home组件闯过来的id数据
   //保存
   this.setData({
     id:id
   });
   wx.cloud.callFunction({//调用创建的云函数
     name:"detail",
     data:{
       id:this.data.id
     }
   }).then(res=>{
     console.log(JSON.parse(res.result));
     this.setData({
       info: JSON.parse(res.result)
     })
   }).catch(err=>{
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