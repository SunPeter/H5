seajs.use(["common"], function(common) {
    var gravity = 0.2;
    var Ball = common.Ball,
        Line = common.Line;

    canvas = document.getElementById('canvas3');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var angle = 20;
    var cos = Math.cos(angle/180*Math.PI),
        sin = Math.sin(angle/180*Math.PI);
    //中心点
    var centerX = width / 2,
        centerY = height / 2;

    //初始点
    var ball = new Ball(100, 50, 5);
    var line = new Line(50,100,200,100);
    line.rotation = angle/180*Math.PI;
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        ball.render(ctx);
        line.render(ctx);
        ball.vy += gravity;
        ball.y += ball.vy;

        var x1 = ball.x - line.x;
        var y1 = ball.y - line.y;

        var x2 = x1*cos + y1*sin;
        var y2 = y1*cos - x1*sin;
    })();
})
