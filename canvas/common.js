/**
 * Created by peter on 14-7-22.
 */
var canvas=document.getElementById("canvas"),
    context=canvas.getContext("2d"),
    width=canvas.width,
    height=canvas.height;

requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || window.oRequestAnimationFrame
    || function(callback) {
        setTimeout(callback, 1000 / 60);
    };
