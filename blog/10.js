seajs.use(["common", "engin"], function(common, engin) {
    var Ball = common.Ball;

    canvas = document.getElementById('canvas10');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var balls = [];
    var sun = new Ball(width/2,height/2,50);
    sun.mass = 10000;
    var earth = new Ball(5,height/2,5);
    earth.mass = 1;
    earth.vy = 10;
    balls.push(sun);
    balls.push(earth);

    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        balls.forEach(function(ball, index) {
            ball.x += ball.vx;
            ball.y += ball.vy;
            for (j = index + 1; j < balls.length; j++) {
                var ball1 = balls[j];
                engin.gravity(ball, ball1);
                engin.bounce(ball, ball1);
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
