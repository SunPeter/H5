seajs.use(["common","engin"], function(common,engin) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas7');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var balls = [],
        totalBall = 20;
    for (var i = 0; i < totalBall; i++) {
        var r = 5,
            x = Math.random() * width,
            y = Math.random() * height,
            mass = 1;
        var ball = new Ball(x, y, r);
        ball.mass = mass;
        ball.vx = Math.random() * 5 - 2;
        ball.vy = Math.random() * 5 - 2;
        balls.push(ball);
    }

    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        balls.forEach(move);
        balls.forEach(function(ball) {
            ball.render(ctx);
        })
    })();


    function move(ball, i) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        checkCollision(ball, i);
        checkBoundry(ball);
    }

    function checkBoundry(ball) {
        if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= -1;

        }
        if (ball.x + ball.radius > width) {
            ball.x = width - ball.radius;
            ball.vx *= -1;
        }
        if (ball.y + ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= -1;
        }
        if (ball.y + ball.radius > height) {
            ball.y = height - ball.radius;
            ball.vy *= -1;
        }
    }

    function checkCollision(ball, i) {
        var ball1 = ball;
        for (var j = i + 1; j < balls.length; j++) {
            var ball2 = balls[j];
            engin.bounce(ball1,ball2);
        }
    }
})