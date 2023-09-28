document.addEventListener('DOMContentLoaded', function(){
    Typed.new("#box", {
        stringsElement: document.getElementById('typed-strings'),
        typeSpeed: 110,
        backDelay: 1000,
        loop: false,
        contentType: 'html', // or text
        loopCount: null,
        callback: function(){ foo(); },
        resetCallback: function() { newTyped(); }
    });

    var resetElement = document.querySelector('.reset');
    if(resetElement) {
        resetElement.addEventListener('click', function() {
            document.getElementById('typed')._typed.reset();
            
        });
    }

    /*
    //飘下小图片效果
    $('body').wpSuperSnow({
        flakes: ['/template/wenan/images/004.png', '/template/wenan/images/003.png', '/template/wenan/images/002.png',
            '/template/wenan/images/001.png'
        ],
        totalFlakes: '50',
        zIndex: '999999',
        maxSize: '28',
        maxDuration: '20',
        useFlakeTrans: false
    });
    */
});

function newTyped(){ /* A new typed object */ }

function foo(){ console.log("Callback"); }

function audioAutoPlay(id){
    var audio = document.getElementById(id),
        play = function(){
            audio.play();
            document.removeEventListener("touchstart",play, false);
        };
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        play();
    }, false);
    document.addEventListener("touchstart",play, false);
}