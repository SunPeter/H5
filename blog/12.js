seajs.use(["common", "engin"], function(common, engin) {
    var Segment = common.Segment;

    canvas = document.getElementById('canvas12');
    ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;

    var segment = new Segment(40,50,100,30,0);
    var segment1 = new Segment(0,0,80,20,0);

    var segment2 = new Segment(40,50,100,30,0);
    var segment3 = new Segment(0,0,80,20,0);

    var cl = 0 , speed = 0.02;
    (function drawFrame() {
        requestAnimationFrame(drawFrame, canvas);
        ctx.clearRect(0, 0, width, height);
        segment1.x = segment.getPin().x;
        segment1.y = segment.getPin().y;
        segment.render(ctx);
        segment1.render(ctx);

        segment3.x = segment2.getPin().x;
        segment3.y = segment2.getPin().y;
        segment2.render(ctx);
        segment3.render(ctx);

        /**
         *  自动化
         */

         walk(segment,segment1,cl);
         walk(segment2,segment3,cl + Math.PI);
         cl += speed;
    })();
    function walk(seg1,seg2,cl) {
      var v = Math.sin(cl) * 45 + 90;
      seg1.setRotation(v);
      var v1 = Math.sin(cl) * 45 + 45;
      seg2.setRotation(v + v1);
    }
    var range = document.getElementById("range");
    range.onchange = function () {
      segment.setRotation(this.value);
    }
})
