/**
 * Created by peter on 14-12-13.
 */
define("stage",["common","util","map","tank","bullet"],function(common,util,map,Tank,Bullet){
    var context=common.context,
        winWidth=common.winWidth,
        winHeight=common.winHeight;
        requestAnimationFrame=common.requestAnimationFrame;
    var tank=new Tank();
    tank.addEvent();
    ;(function drawFrame(){
        requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,winWidth,winHeight);

        map.drawMap();

        tank.draw();
        tank.move();
    })();
});
