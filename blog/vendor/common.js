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