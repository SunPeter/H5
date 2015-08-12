seajs.use(["common"], function(common) {
    var Ball = common.Ball,
        Line = common.Line;

    canvas = document.getElementById('canvas3');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var angle = 0.03;
    var cos = Math.cos(angle),
        sin = Math.sin(angle);
    //中心点
    var centerX = width / 2,
        centerY = height / 2;

    //初始点
    // var x = 50,y = 50;
    var ball = new Ball(100, 50, 5);
    var line = new Line(20,150,150,100);
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        
        ball.render(ctx);
        line.render(ctx);
        console.log(line.getBoundry());
    })();
})
