define("tank",["common","bullet","map"],function(common,Bullet,map){
    var context=common.context,
        winWidth=common.winWidth,
        winHeight=common.winHeight;
    bulletConst=common.constVal.bullet;
    tanlConst=common.constVal.tank;
    var Tank=function(){
        this.x=tankConst.width/2;
        this.y=tankConst.height/2;
        this.direction="up";
        this.lastDirecton="up";
        this.bounce=-1;
        this.rotateAngle=0;
        this.fire=false;//是否开火
        this.go=false;//是否在运动
        this.img="tank/tank1_small.png";
        this.movelock=false;
        this.bullets=[];
        this.vxStand=tankConst.vxStand;
        this.vyStand=tankConst.vyStand;
        this.width=tankConst.width;
        this.height=tankConst.height;
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
            $this.lastDirecton=$this.direction;
            $this.movelock=true;
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
                $this.movelock=false;
                $this.go=false;
            }
        },false);
    }

    Tank.prototype.move=function(){
        var row=Math.floor(this.y/tankConst.height);
        var column=Math.floor(this.x/tankConst.width);
        if(this.go){
            if(this.direction=="up"){
                this.vx=0;
                this.vy=-this.vyStand;
                this.rotateAngle=0;
                if(row==0||map.detail[row-1][column]>0){
                    this.stop();
                }
            }
            if(this.direction=="down"){
                this.vx=0;
                this.vy=this.vyStand;
                this.rotateAngle=180;
                if(row==map.row-1||map.detail[row+1][column]>0){
                    this.stop();
                }
            }
            if(this.direction=="left"){
                this.vx=-this.vxStand;
                this.vy=0;
                this.rotateAngle=270;
                if(column==0||map.detail[row][column-1]>0){
                    this.stop();
                }
            }
            if(this.direction=="right"){
                this.vx=this.vxStand;
                this.vy=0;
                this.rotateAngle=90;
                if(column==map.column-1||map.detail[row][column+1]>0){
                    this.stop();
                }
            }
            if(this.movelock&&this.lastDirecton==this.direction){
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

        context.restore();
    }

    Tank.prototype.stop=function(){
        this.vx=this.vy=0;
        return;
    }

    Tank.prototype.addBullet=function(){
        if(this.fire){
            var bullet=new Bullet(this.x,this.y,this.direction);
            bullet.init();
            this.bullets.unshift(bullet);
        }
        window.bullets=this.bullets;
    }

    return Tank;
});