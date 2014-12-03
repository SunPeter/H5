var lastPosition = null
function onIdle(me, enemy, game) {
    if (enemy.tank) {
        checkDirection(me.tank);
        checkDirection(enemy.tank);
        // 即敌方坦克不在草丛中
        print(me.tank.directionVal);
//        print(enemy.tank.directionVal);
        if (!me.bullet) {
            // 因为场上只能存在一枚己方炮弹，所以在这儿判断一下，以免白白浪费指令
            if (me.tank.position[0] === enemy.tank.position[0]&&me.tank.directionVal*enemy.tank.directionVal==-4){
                me.fire();
            }else if (me.tank.position[1] === enemy.tank.position[1]&&me.tank.directionVal*enemy.tank.directionVal==-1){
                me.fire();
            }

        }
    }
    if (lastPosition !== null &&
        me.tank.position[0] === lastPosition[0] &&
        me.tank.position[1] === lastPosition[1]) {
        var turn = ['left', 'right','up','down'][Math.floor(Math.random() * 4)]
        me.turn(turn);
    }
    lastPosition = me.tank.position.slice()
    me.go()
}


function checkDirection(tank){
    switch (tank.direction){
        case "left":
            tank.directionVal=-2;
            break;
        case "right":
            tank.directionVal=2;
            break;
        case "up":
            tank.directionVal=-1;
            break;
        case "down":
            tank.directionVal=1;
            break;
    }
}