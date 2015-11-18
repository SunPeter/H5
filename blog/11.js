seajs.use(["common", "engin"], function(common, engin) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas11');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var springAmount = 0.001;
    var minDist = 40;

    var balls = [],
        totalBall = 10;
    for (var i = 0; i < totalBall; i++) {
        var r = Math.ceil(Math.random() * 5),
            x = Math.random() * width,
            y = Math.random() * height,
            mass = 1;
        var ball = new Ball(x, y, r);
        ball.mass = mass;
        ball.vx = Math.random() * 5 - 2;
        ball.vy = Math.random() * 5 - 2;
        ball.bg = "#FFF";
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
                spring(ball, ball1);
            }
            ball.move(width, height);
            ball.render(ctx);
        })
    })();


    function move(ball, i) {
        ball.x += ball.vx;
        ball.y += ball.vy;
        checkCollision(ball, i);
        checkBoundry(ball);
    }

    function spring(ball1, ball2) {
        var dx = ball2.x - ball1.x,
            dy = ball2.y - ball1.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ);
        if (dist < minDist) {
            ax = dx * springAmount,
            ay = dy * springAmount;
            alpha = dist/minDist;
            ball1.vx += ax / ball1.mass;
            ball1.vy += ay / ball1.mass;
            ball2.vx -= ax / ball2.mass;
            ball2.vy -= ay / ball2.mass;
            drawLine(ball1.x,ball1.y,ball2.x,ball2.y,alpha);
        }
    }

    function drawLine(x1,y1,x2,y2,alpha){
        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
})
