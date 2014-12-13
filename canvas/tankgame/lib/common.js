define("common", [], function () {
    requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame
        || window.oRequestAnimationFrame
        || function (callback) {
            setTimeout(callback, 1000 / 60);
        };
    cancelRequestAnimationFrame = (window.cancelRequestAnimationFrame
        || window.mozCancelRequestAnimationFrame
        || window.webkitCancelRequestAnimationFrame
        || window.msCancelRequestAnimationFrame
        || window.oCancelRequestAnimationFrame
        || window.clearTimeout);

    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        winWidth = canvas.width,
        winHeight = canvas.height;
    var constVal = {
        tank: {
            vxStand:50,
            vyStand:50,
            width:50,
            height:50
        },
        bullet: {
            width:13,
            height:21,
            vx:10,
            vy:10
        }
    }
    return{
        canvas: canvas,
        context: context,
        winWidth: winWidth,
        winHeight: winHeight,
        constVal:constVal,
        requestAnimationFrame: requestAnimationFrame,
        cancelRequestAnimationFrame: cancelRequestAnimationFrame
    }
});



