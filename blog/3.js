seajs.use(["common"], function(common) {
    var gravity = 0.2;
    var Ball = common.Ball,
        Line = common.Line;

    canvas = document.getElementById('canvas3');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var bounce = -0.7;
    var angle = 20;
    var cos = Math.cos(angle / 180 * Math.PI),
        sin = Math.sin(angle / 180 * Math.PI);
    //中心点
    var centerX = width / 2,
        centerY = height / 2;

    //初始点
    var ball = new Ball(100, 50, 5);
    var line = new Line(0, 0, 200, 0);
    line.x = 50, line.y = 100;
    line.rotation = angle / 180 * Math.PI;
    var boundry = line.getBoundry();
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);

        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;

        var x1 = ball.x - line.x;
        var y1 = ball.y - line.y;

        var x2 = x1 * cos + y1 * sin;
        var y2 = y1 * cos - x1 * sin;

        if (y2 + ball.radius > 0 && ball.x > boundry.x && ball.x <= boundry.x + boundry.width) {
            var vx2 = ball.vx * cos + ball.vy * sin;
            var vy2 = ball.vy * cos - ball.vx * sin;

            y2 = -ball.radius;
            vy2 *= bounce;

            x1 = x2 * cos - y2 * sin;
            y1 = y2 * cos + x2 * sin;

            ball.vx = vx2 * cos - vy2 * sin;
            ball.vy = vy2 * cos + vx2 * sin;

            ball.x = line.x + x1;
            ball.y = line.y + y1;
        }



        ball.render(ctx);
        line.render(ctx);
    })();
})