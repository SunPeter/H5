define("common", [], function(require, exports) {
    exports.Ball = function(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.render = function(ctx) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }
    exports.Line = function(sx,sy,dx,dy){
        this.x = 0;
        this.y = 0;
        this.sx = sx;
        this.sy = sy;
        this.dx = dx;
        this.dy = dy;
        this.rotation = 0;
        this.render = function(ctx){
            ctx.save();
            ctx.beginPath();
            ctx.translate(this.x,this.y);
            ctx.moveTo(sx,sy);
            ctx.lineTo(dx,dy);
            ctx.stroke();
            ctx.restore();
        }
        this.getBoundry = function(){
            var cos = Math.cos(this.rotation/180*Math.PI),
                sin = Math.sin(this.rotation/180*Math.PI);
            var sx = this.sx*cos+this.sy*sin,
                sy = this.sy*cos-this.sx*sin;
            var dx = this.dx*cos+this.dy*sin,
                dy = this.dy*cos-this.dx*sin;
            return {
                x:this.x + Math.min(sx,dx),
                y:this.y + Math.min(sy,dy),
                width:Math.max(sx,dx) - Math.min(sx,dx),
                height:Math.max(sy,dy) - Math.min(sy,dy)
            }
        }
    }
})
