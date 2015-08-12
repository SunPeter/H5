seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas1');
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
    var ball = new Ball(50, 50, 5);
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        var x1 = ball.x - centerX,
            y1 = ball.y - centerY;
        var x2 = x1 * cos - y1 * sin,
            y2 = y1 * cos + x1 * sin;
        ball.x = centerX + x2;
        ball.y = centerY + y2;
        ball.render(ctx);

    })();
})
