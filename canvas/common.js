/**
 * Created by peter on 14-7-22.
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

function Ball(r){
    this.x=0;
    this.y=0;
    this.scaleX=1;
    this.scaleY=1;
    this.vx=0;
    this.vy=0;
    this.ax=0;
    this.ay=0;
    this.mass=1;
    this.fillStyle="#FFF";
    this.bounce=-1;
    if(r==undefined){
        r=40;
    }
    this.radius=r;
}

Ball.prototype.draw=function(){
    context.save();
    context.beginPath();
    context.translate(this.x,this.y);
    context.scale(this.scaleX,this.scaleY);
    context.arc(0,0,this.radius,0,Math.PI*2,false);
    context.strokeStyle="#000";
    context.fillStyle=this.fillStyle;
    context.stroke();
    context.fill();
    context.restore();
}

Ball.prototype.move=function(){
    if(this.x+this.radius>width){
        this.vx*=this.bounce;
        this.x=width-this.radius;
    }
    else if(this.x+this.vx<this.radius){
        this.vx*=this.bounce;
        this.x=this.radius;
    }

    if(this.y+this.radius>height){
        this.vy*=this.bounce;
        this.y=height-this.radius;
    }
    else if(this.y+this.vy<this.radius){
        this.vy*=this.bounce;
        this.y=this.radius;
    }

    this.x+=this.vx;
    this.y+=this.vy;
}
function Ship(){
    this.x=width/2;
    this.y=height/2;
    this.vx=0;
    this.vy=0;
    this.rotateAngle=0;
    this.speedUp=false;
}
Ship.prototype.draw=function(){
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotateAngle/180*Math.PI);
    context.strokeStyle="#FFF";
    context.lineWidth=1;
    context.beginPath();
    context.moveTo(10,0);
    context.lineTo(-10,10);
    context.lineTo(-5,0);
    context.lineTo(-10,-10);
    context.closePath();
    context.stroke();
    if(this.speedUp){
        context.beginPath();
        context.moveTo(-7.5,5);
        context.lineTo(-15,0);
        context.lineTo(-7.5,-5);
        context.stroke();
    }
    context.restore();
}

var Bullet=function(){
    this.x=width/2;
    this.y=height/2;
    this.scaleX=1;
    this.scaleY=1;
    this.directionX="";
    this.vx=10;
    this.vy=10;
    this.width=13;
    this.height=21;
    this.bounce=-1;
    this.fillStyle="#000";
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
    context.fillStyle=this.fillStyle;

    context.beginPath();
//    context.fillRect(-this.width/2,-this.height/2,this.width,this.height);
    context.drawImage(img,-this.width/2,-this.height/2,this.width,this.height);
    context.restore();
}
Bullet.prototype.move=function(){
    if(this.x<=0||this.x+this.width>=width||this.y<=0||this.y+this.height>=height){
        this.active=false;
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


var Tank=function(){
    this.x=width/2;
    this.y=height/2;
    this.scaleX=1;
    this.scaleY=1;
    this.directionX="";
    this.vx=10;
    this.vy=10;
    this.width=25;
    this.height=25;
    this.bounce=-1;
    this.rotateAngle=0;
    this.img="../tank/tank1_small.png";
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

Tank.prototype.move=function(){
    if(this.x<=0||this.x+this.width>=width||this.y<=0||this.y+this.height>=height){
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


