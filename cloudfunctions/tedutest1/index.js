// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//功能:向公司发送请求
//引入模块 request-promise
const rp=require("request-promise");
// 云函数入口函数
exports.main = async (event, context) => {
  //创建变量url 公司网址
  var url ="http://www.tmooc.cn/";
  //向网址发送请求 
  return rp(url).then(res => {//成功回调
    return res;//将结果返回
  }).catch(err => {//失败回调
   console.log(err);
 })
}