seajs.use(["common", "engin"], function(common, engin) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas8');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var balls = [],
        totalBall = 10;
    for (var i = 0; i < totalBall; i++) {
        var r = 5,
            x = Math.random() * width,
            y = Math.random() * height,
            mass = 1;
        var ball = new Ball(x, y, r);
        ball.mass = mass;
        // ball.vx = Math.random() * 5 - 2;
        // ball.vy = Math.random() * 5 - 2;
        balls.push(ball);
    }

    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        balls.forEach(function(ball, index) {
            ball.x += ball.vx;
            ball.y += ball.vy;
            for (j = index + 1; j < balls.length; j++) {
                var ball1 = balls[j];
                engin.gravity(ball, ball1);
            }
            ball.render(ctx);
        })
    })();


    function move(ball, i) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        checkCollision(ball, i);
        checkBoundry(ball);
    }
})
