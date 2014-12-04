/**
 * Created by peter on 14-12-03.
 */
var canvas=document.getElementById("canvas"),
    context=canvas.getContext("2d"),
    width=canvas.width,
    height=canvas.height;

requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(callback) {
        setTimeout(callback, 1000 / 60);
    };
cancelRequestAnimationFrame=(window.cancelRequestAnimationFrame
    ||window.mozCancelRequestAnimationFrame
    ||window.webkitCancelRequestAnimationFrame
    ||window.msCancelRequestAnimationFrame
    ||window.oCancelRequestAnimationFrame
    ||window.clearTimeout);
//地图绘制
var map={
    cellx:50,
    celly:50,
    column:6,
    row:6,
    positionX:0,
    positionY:0,
    imgSrc:"../tank/ground.png",
    printGround:function(){
        var img=new Image();
        img.src=map.imgSrc;
        context.save();
        context.translate(map.positionX,map.positionY);
        context.beginPath();
        context.drawImage(img,0,0,map.cellx,map.celly);
        context.restore();
    },
    detail:[0,0,0,0,1,0,
            0,0,2,0,0,0,
            0,1,0,0,0,0,
            0,0,3,0,1,0,
            0,0,0,0,0,0,
            0,0,0,0,0,0],
    drawMap:function(){
        for(var i=0;i<map.detail.length;i++){
            map.positionX=Math.floor(i%map.column)*map.cellx;
            map.positionY=Math.floor(i/map.row)*map.celly;
            if(map.detail[i]==0){
                map.imgSrc="";
            }
            if(map.detail[i]==1){
                map.imgSrc="../tank/stone.png";
            }
            if(map.detail[i]==2){
                map.imgSrc="../tank/star.png";
            }
            if(map.detail[i]==3){
                map.imgSrc="../tank/grass.png";
            }
            map.printGround();
        }
    }
}
window.onload=function(){
    map.drawMap();
}

/**坦克对象
 *
 * @constructor
 */
var Tank=function(){
    this.cellW=50/2;
    this.cellH=50/2;
    this.x=50/2;
    this.y=50/2;
    this.direction="up";
    this.vxStand=50;
    this.vyStand=50;
    this.width=50;
    this.height=50;
    this.bounce=-1;
    this.rotateAngle=0;
    this.fire=false;//是否开火
    this.go=false;//是否在运动
    this.img="../tank/tank1_small.png";
    this.movelock=false;
    this.bullets=[];
}

Tank.prototype.draw=function(){
    var img=new Image();
    img.src=this.img;

    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotateAngle/180*Math.PI);

    context.beginPath();
    context.drawImage(img,-this.width/2,-this.height/2,this.width,this.height);
    context.restore();
}

Tank.prototype.addEvent=function(){
    var $this=this;
    document.addEventListener("keydown",function(e){
        this.movelock=true;
        var keyCode=e.keyCode;
        if(keyCode==32){
            $this.fire=true;
            $this.addBullet();
        }
        if(keyCode==37){
            $this.direction="left";
            $this.go=true;
        }
        if(keyCode==38){
            $this.direction="up";
            $this.go=true;
        }
        if(keyCode==39){
            $this.direction="right";
            $this.go=true;
        }
        if(keyCode==40){
            $this.direction="down";
            $this.go=true;
        }
    },false);

    document.addEventListener("keyup",function(e){
        var keyCode= e.keyCode;
        if(keyCode==32){
            $this.fire=false;
        }
        if(keyCode==37||keyCode==38||keyCode==39||keyCode==40){
            $this.movelock=true;
            $this.go=false;
        }
    },false);
}

Tank.prototype.move=function(){
    if(this.go){
        if(this.direction=="up"){
            this.vx=0;
            this.vy=-this.vyStand;
            this.rotateAngle=0;
            if(this.y-this.cellH<=0){
                this.stop();
            }
        }
        if(this.direction=="down"){
            this.vx=0;
            this.vy=this.vyStand;
            this.rotateAngle=180;
            if(this.y-this.cellH+this.height>=height){
                this.stop();
            }
        }
        if(this.direction=="left"){
            this.vx=-this.vxStand;
            this.vy=0;
            this.rotateAngle=270;
            if(this.x-this.cellW<=0){
                this.stop();
            }
        }
        if(this.direction=="right"){
            this.vx=this.vxStand;
            this.vy=0;
            this.rotateAngle=90;
            if(this.x-this.cellW+this.width>=width){
                this.stop();
            }
        }
        if(this.movelock){
            this.x+=this.vx;
            this.y+=this.vy;
            this.movelock=false;
        }
    }

    var bullets=this.bullets;
    if(bullets.length>0){
        bullets.forEach(function(bullet){
            if(bullet.active){
                bullet.move();
                bullet.draw();
            }
            else{
                var index=bullets.indexOf(bullet);
                bullets.splice(index);
            }
        });
    }

}

Tank.prototype.stop=function(){
    this.vx=this.vy=0;
    return;
}
Tank.prototype.addBullet=function(){
    if(this.fire){
        var bullet=new Bullet(this.x,this.y,this.direction);
        this.bullets.unshift(bullet);
    }
}

var Bullet=function(x,y,direction){
    this.x=x;
    this.y=y;
    this.scaleX=1;
    this.scaleY=1;
    this.direction=direction;
    this.vx=10;
    this.vy=10;
    this.width=13;
    this.height=21;
    this.bounce=-1;
    this.active=true;
    this.rotateAngle=0;
    this.img="../tank/bullet1.png";
}
Bullet.prototype.draw=function(){
    var img=new Image();
    img.src=this.img;

    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotateAngle/180*Math.PI);

    context.beginPath();
    context.drawImage(img,-this.width/2,-this.height/2,this.width,this.height);
    context.restore();
}
Bullet.prototype.move=function(){
    if(this.x<=0||this.x+this.width>=width||this.y<=0||this.y+this.height>=height){
        this.crash();
        return;
    }
    if(this.direction=="up"){
        this.vx=0;
        this.vy=-10;
        this.rotateAngle=0;
    }
    if(this.direction=="down"){
        this.vx=0;
        this.vy=10;
        this.rotateAngle=180;
    }
    if(this.direction=="left"){
        this.vx=-10;
        this.vy=0;
        this.rotateAngle=270;
    }
    if(this.direction=="right"){
        this.vx=10;
        this.vy=0;
        this.rotateAngle=90;
    }
    this.x+=this.vx;
    this.y+=this.vy;
}
Bullet.prototype.crash=function(){
    this.img="../tank/crash1.png";
    this.width=50;
    this.height=50;
    this.stop();
    var _this=this;
    setTimeout(function(){
        _this.active=false;
    },100);
}
Bullet.prototype.stop=function(){
    this.vx=this.vy=0;
}


