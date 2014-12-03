/**
 * Created by peter on 14-12-3.
 */
var util={
    "rectangleIntersects":function(ObjA,ObjB){
        return (ObjA.x+ObjA.width<ObjB.x||ObjB.x+ObjB.width<ObjA.x||ObjA.y+ObjA.height<ObjB.y||ObjB.y+ObjB.height<ObjA.y);
    },
    "ballIntersects":function(ObjA,ObjB){
        return (Math.pow((ObjA.x-ObjB.x),2)+Math.pow((ObjA.y-ObjB.y),2)>Math.pow((ObjA.radius+ObjB.radius),2));
    },
    "parseColor":function (color, toNumber) {
        if (toNumber === true) {
            if (typeof color === 'number') {
                return (color | 0); //chop off decimal
            }
            if (typeof color === 'string' && color[0] === '#') {
                color = color.slice(1);
            }
            return window.parseInt(color, 16);
        } else {
            if (typeof color === 'number') {
                color = '#' + ('00000' + (color | 0).toString(16)).substr(-6); //pad
            }
            return color;
        }
    }
}