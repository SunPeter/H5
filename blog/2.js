seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas2');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var vr = 0.03,
        radius = 50,
        angle = 0;
    //中心点
    var centerX = width / 2,
        centerY = height / 2;

    //初始点
    // var x = 50,y = 50;
    var ball = new Ball(50, 50, 5);
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        ball.x = centerX + radius * Math.cos(angle);
        ball.y = centerY + radius * Math.sin(angle);
        angle += vr;
        ball.render(ctx);
    })();
})
