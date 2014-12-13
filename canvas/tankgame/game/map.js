/**
 * Created by peter on 14-12-13.
 */
define("map",["common"],function(common){
    var context=common.context,
        winWidth=common.winWidth,
        winHeight=common.winHeight;
    var map={
        cellx:50,
        celly:50,
        column:6,
        row:6,
        positionX:0,
        positionY:0,
        imgSrc:"",
        printGround:function(){
            var img=new Image();
            img.src=map.imgSrc;
            context.save();
            context.translate(map.positionX,map.positionY);
            context.beginPath();
            context.drawImage(img,0,0,map.cellx,map.celly);
            context.restore();
        },
        detail:[0,0,0,1,1,0,
            0,0,2,0,0,0,
            0,1,0,2,0,0,
            0,0,3,0,1,0,
            0,0,0,3,0,0,
            0,0,0,0,0,0],
        drawMap:function(){
            for(var i=0;i<map.detail.length;i++){
                map.positionX=Math.floor(i%map.column)*map.cellx;
                map.positionY=Math.floor(i/map.row)*map.celly;
                if(map.detail[i]==0){
                    map.imgSrc="";
                }
                if(map.detail[i]==1){
                    map.imgSrc="tank/stone.png";
                }
                if(map.detail[i]==2){
                    map.imgSrc="tank/star.png";
                }
                if(map.detail[i]==3){
                    map.imgSrc="tank/grass.png";
                }
                map.printGround();
            }
        }
    }
    return map;
});
