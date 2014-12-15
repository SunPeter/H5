#橡皮擦/刮刮卡  HTML5实现  
##方法1  
    使用ctx.save->clip->ctx.restore  
##方法2  
    使用ctx.globalCompositeOperation=source-over  

##keypoint  
    1.clip时，需要根据起始点和终止点绘制出其中的类矩形区域(可能是菱形)   
    2.在move的过程中，为了保证线条的连贯，所以在矩形一端画圆   
    
##感谢   
    [吖猩](http://2.axescanvas.sinaapp.com/demoHome/index.html) 以及[相关博文](http://www.cnblogs.com/axes/p/3850309.html#3057359)