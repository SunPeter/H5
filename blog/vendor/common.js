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
        this.bg = '#000';
        this.render = function(ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.bg;
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
    exports.Segment = function(x,y,width,height,rotation){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = rotation/180 * Math.PI;
        this.strokeStyle = "#000";
        this.lineWidth = 1;
        this.draw = function(){
          /**
           *  c 为半径  d为实际宽度
           */
            var w = this.width,h = this.height;
            var c = h/2, d = w + h;
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.rotation);
            ctx.scale(this.scaleX, this.scaleY);
            ctx.beginPath();
            ctx.moveTo(0 , -c);
            ctx.lineTo(w, -c);
            ctx.quadraticCurveTo( w + c, -c , w + c , 0);
            ctx.quadraticCurveTo( w + c, c , w , c);
            ctx.lineTo(0, c);
            ctx.quadraticCurveTo( -c, c , -c , 0);
            ctx.quadraticCurveTo( -c, -c , 0 , -c);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0,0,2,0,Math.PI*2,true);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w,0,2,0,Math.PI*2,true);
            ctx.stroke();
            ctx.restore();


        },
        this.render = function(ctx){
          this.draw();
        },
        this.setRotation = function  (rotation) {
          this.rotation = rotation/180 * Math.PI;
        },
        this.getPin = function () {
          return {
            x: this.x + Math.cos(this.rotation) * this.width,
            y: this.y + Math.sin(this.rotation) * this.width
          };
        };
    }
})
