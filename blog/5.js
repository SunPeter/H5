seajs.use(["common"], function(common) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas5');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var ball1 = new Ball(50, 100, 5);
    ball1.vx = 5;
    ball1.mass = 1;

    var ball2 = new Ball(150, 100, 5);
    ball2.vx = -10;
    ball2.mass = 2;

    var relativeV = ball1.vx - ball2.vx;
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        ball1.x += ball1.vx;
        ball2.x += ball2.vx;
        if (Math.abs(ball2.x - ball1.x) < ball1.radius + ball2.radius) {
            ball1.x = ball2.x - (ball1.radius + ball2.radius);
            var vx1 = ((ball1.mass - ball2.mass) * ball1.vx + 2 * ball2.mass * ball2.vx) / (ball1.mass + ball2.mass);
            var vx2 = vx1 + relativeV;
            ball1.vx = vx1, ball2.vx = vx2;

        }
        ball1.render(ctx);
        ball2.render(ctx);
    })();
})