/**
 * Created by peter on 14-12-13.
 */
define("stage",["common","util","map","tank","bullet"],function(common,util,map,Tank,Bullet){
    var context=common.context,
        winWidth=common.winWidth,
        winHeight=common.winHeight;
        requestAnimationFrame=common.requestAnimationFrame;
    var tank1=new Tank(false);
    tank1.addEvent();
    var tank2=new Tank(true,25,125);

    ;(function drawFrame(){
        requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,winWidth,winHeight);

        map.drawMap();

        tank1.draw();
        tank1.move();
        tank2.draw();
        util.moveOnCtl(function(){
            tank2.autoMove();
        },600);
    })();
});
