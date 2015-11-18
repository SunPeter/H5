define("engin", [], function(require, exports) {
    exports.gravity = function(ball1, ball2) {
        var dx = ball2.x - ball1.x,
            dy = ball2.y - ball1.y,
            distSQ = dx * dx + dy * dy,
            dist = Math.sqrt(distSQ),
            force = ball1.mass * ball2.mass / distSQ,
            ax = force * dx / dist,
            ay = force * dy / dist;
        ball1.vx += ax / ball1.mass;
        ball1.vy += ay / ball1.mass;
        ball2.vx -= ax / ball2.mass;
        ball2.vy -= ay / ball2.mass;
    }
    exports.bounce = function(ball1, ball2) {
        var dx = ball2.x - ball1.x,
            dy = ball2.y - ball1.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ball1.radius + ball2.radius) {

            var angle = Math.atan2(dy, dx);
            var cos = Math.cos(angle),
                sin = Math.sin(angle);
            //rotate 
            var x1 = 0,
                y1 = 0;
            var x2 = dx * cos + dy * sin,
                y2 = dy * cos - dx * sin;

            var vx1 = ball1.vx * cos + ball1.vy * sin,
                vy1 = ball1.vy * cos - ball1.vx * sin;
            var vx2 = ball2.vx * cos + ball2.vy * sin,
                vy2 = ball2.vy * cos - ball2.vx * sin;

            var relativeV = vx1 - vx2;
            vx1 = ((ball1.mass - ball2.mass) * vx1 + 2 * ball2.mass * vx2) / (ball1.mass + ball2.mass);
            vx2 = vx1 + relativeV;

            //避免粘在一起
            var absV = Math.abs(vx1) + Math.abs(vx2),
                overlap = (ball1.radius + ball2.radius) - Math.abs(x1 - x2);
            x1 += vx1 / absV * overlap;
            x2 += vx2 / absV * overlap;

            //rotate positions back
            var x1Final = x1 * cos - y1 * sin,
                y1Final = y1 * cos + x1 * sin,
                x2Final = x2 * cos - y2 * sin,
                y2Final = y2 * cos + x2 * sin;
            //adjust positions to actual screen positions
            ball2.x = ball1.x + x2Final;
            ball2.y = ball1.y + y2Final;
            ball1.x = ball1.x + x1Final;
            ball1.y = ball1.y + y1Final;
            //rotate velocities back
            ball1.vx = vx1 * cos - vy1 * sin;
            ball1.vy = vy1 * cos + vx1 * sin;
            ball2.vx = vx2 * cos - vy2 * sin;
            ball2.vy = vy2 * cos + vx2 * sin;
        }
    }
});
