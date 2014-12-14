/**
 * Created by peter on 14-12-13.
 */
define("bullet",["common","map"],function(common,map){
    bulletConst=common.constVal.bullet;
    tankConst=common.constVal.tank;
    var context=common.context,
        winWidth=common.winWidth,
        winHeight=common.winHeight;
    var Bullet=function(x,y,direction){
        this.x=x;
        this.y=y;
        this.direction=direction;
        this.bounce=-1;
        this.active=true;
        this.rotateAngle=0;
        this.img="tank/bullet1.png";
        this.vx=bulletConst.vx;
        this.vy=bulletConst.vy;
        this.tankW=tankConst.width;
        this.tankH=tankConst.height;
        this.width=bulletConst.width;
        this.height=bulletConst.height;
    }
    Bullet.prototype.init=function(){
        if(this.direction=="up"){
            this.y=this.y-this.tankH/2-this.height/2;
        }
        if(this.direction=="down"){
            this.y=this.y+this.tankH/2+this.height/2;
        }
        if(this.direction=="left"){
            this.x=this.x-this.tankW/2-this.width/2;
        }
        if(this.direction=="right"){
            this.x=this.x+this.tankW/2+this.width/2;
        }
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
        var row=Math.floor(this.y/map.celly);
        var column=Math.floor(this.x/map.cellx);
        if(this.direction=="up"){
            this.vx=0;
            this.vy=-10;
            this.rotateAngle=0;
            if(row==-1||map.detail[row][column]>0){
                this.crash();
            }
        }
        if(this.direction=="down"){
            this.vx=0;
            this.vy=10;
            this.rotateAngle=180;
            if(row==map.row||map.detail[row][column]>0){
                this.crash();
            }
        }
        if(this.direction=="left"){
            this.vx=-10;
            this.vy=0;
            this.rotateAngle=270;
            if(column==-1||map.detail[row][column]>0){
                this.crash();
            }
        }
        if(this.direction=="right"){
            this.vx=10;
            this.vy=0;
            this.rotateAngle=90;
            if(column==map.column||map.detail[row][column]>0){
                this.crash();
            }
        }
        this.x+=this.vx;
        this.y+=this.vy;
    }
    Bullet.prototype.crash=function(){
        this.img="tank/crash1.png";
        this.width=50;
        this.height=50;
        this.stop();
        var _this=this;
        setTimeout(function(){
            _this.active=false;
        },100);
        return;
    }
    Bullet.prototype.stop=function(){
        this.vx=this.vy=0;
    }
    return Bullet;
});