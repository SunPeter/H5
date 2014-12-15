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
        column:10,
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
        detail:[
            [0,0,0,1,1,0,0,0,0,0],
            [0,0,2,0,0,0,0,0,0,0],
            [0,1,0,2,0,0,0,0,0,2],
            [0,0,3,0,1,0,0,0,0,0],
            [0,0,0,3,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
            ],
        drawMap:function(){
            for(var i=0;i<map.row;i++){
                for(var j=0;j<map.column;j++){
                    map.positionX=j*map.cellx;
                    map.positionY=i*map.celly;
                    switch (map.detail[i][j]){
                        case 1:
                            map.imgSrc="tank/stone.png";
                            break;
                        case 2:
                            map.imgSrc="tank/star.png";
                            break;
                        case 3:
                            map.imgSrc="tank/grass.png";
                            break;
                        default:
                            map.imgSrc="";
                    }
                    map.printGround();
                }
            }
        }
    }
    return map;
});
