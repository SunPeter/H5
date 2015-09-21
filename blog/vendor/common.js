define("common", [], function(require, exports) {
    exports.Ball = function(x, y, r) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.radius = r;
        this.bounce = -1;
        this.render = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            },
            this.move = function(w, h) {
                if (this.x - this.radius <= 0) {
                    this.vx *= this.bounce;
                    this.x = this.radius;
                } else if (this.x + this.radius >= w) {
                    this.vx *= this.bounce;
                    this.x = w - this.radius;
                }
                if (this.y - this.radius <= 0) {
                    this.vy *= this.bounce;
                    this.y = this.radius;
                } else if (this.y + this.radius >= h) {
                    this.vy *= this.bounce;
                    this.y = h - this.radius;
                }
            },
            this.collision = function(ball1, ball2) {
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

                    x1 += vx1;
                    x2 += vx2;
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
    }
    exports.Line = function(sx, sy, dx, dy) {
        this.x = 0;
        this.y = 0;
        this.sx = sx;
        this.sy = sy;
        this.dx = dx;
        this.dy = dy;
        this.rotation = 0;
        this.render = function(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(dx, dy);
            ctx.stroke();
            ctx.restore();
        }
        this.getBoundry = function() {
            var cos = Math.cos(this.rotation),
                sin = Math.sin(this.rotation);
            var sx = this.sx * cos + this.sy * sin,
                sy = this.sy * cos - this.sx * sin;
            var dx = this.dx * cos + this.dy * sin,
                dy = this.dy * cos - this.dx * sin;
            return {
                x: this.x + Math.min(sx, dx),
                y: this.y + Math.min(sy, dy),
                width: Math.max(sx, dx) - Math.min(sx, dx),
                height: Math.max(sy, dy) - Math.min(sy, dy)
            }
        }
    }
})