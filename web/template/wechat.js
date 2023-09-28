function Get(){
  var a=location.search.substr(1).split("&"),b={},c,i
  for(i in a){
    c=a[i].split("=")
    if(c.length && c[0] !== "") b[decodeURIComponent(c.shift())]=decodeURIComponent(c.join("="))
  }
  return b
}
function btnReturn() {
    const url = '../index/index';
    wx.miniProgram.navigateBack({});
    console.log("返回了")
}
function btnMake(){
    var myAudio = document.getElementById('audio_music');
    myAudio.pause();
    if(data_type == 1){
        var url = "../make/make?type=user&id="+ id +"&public=1" ;
    }else{
        var url = "../make/make?id=" + Get()['demo_id'];
    }
    console.log("小程序制作url：" + url);
    wx.miniProgram.navigateTo({
        url: url
    });
    console.log("点击跳转制作界面了");
}
function btnMakeData(){
    this.btnMakeUrl();
    console.log("点击立即制作文案了")
}