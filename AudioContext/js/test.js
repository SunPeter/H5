/**
 * Created by peter on 14-7-18.
 */
var Player=function(){
    this.file=null,
    this.fileName=null,
    this.audioContext=null,
    this.source=null
}

Player.prototype={
    _init:function(){
        this._prepareAPI();
        this._addEventListener();
    },
    _prepareAPI:function(){
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
        try{
            this.audioContext=new AudioContext();
        }
        catch(e){
            console.log("your broswer doesn't support audioContent");
        }
    },
    _addEventListener:function(){
        var that=this;
        var upload=document.getElementById("upload");
        upload.onchange=function(){
            if(upload.files.length!=0){
               that.file=upload.files[0];
               that.fileName=that.file.name;
               that._start();
            }
        }
    },
    _start:function(){
        var that=this;
        var file=that.file;
        var fr=new FileReader();
        //fr与文件关联起来
        fr.readAsArrayBuffer(file);
        fr.onload=function(e){
            var fileResult = e.target.result;
            var audioContext = that.audioContext;

            //异步编码  返回buffer
            audioContext.decodeAudioData(fileResult,function(buffer){
                that.__visualize(audioContext,buffer);
            });
            if (audioContext === null) {
                return;
            };

        }
    },
    __visualize:function(audioContext,buffer){
        var analyser=audioContext.createAnalyser();
        var audioContextNode=audioContext.createBufferSource();
        audioContextNode.connect(analyser);
        analyser.connect(audioContext.destination);
        audioContextNode.buffer=buffer;
        audioContextNode.start(0);
        this._analyse(analyser);
    },
    _analyse:function(analyser) {
        var that = this,
            canvas = document.getElementById('canvas'),
            cwidth = canvas.width,
            cheight = canvas.height - 2,
            meterWidth = 10, //width of the meters in the spectrum
            gap = 2, //gap between meters
            capHeight = 2,
            capStyle = '#fff',
            meterNum = cwidth / (meterWidth + gap), //count of the meters
            capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
        ctx = canvas.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(1, '#0f0');
        gradient.addColorStop(0.5, '#ff0');
        gradient.addColorStop(0, '#f00');
        var drawMeter = function () {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            if (that.status === 0) {
                //fix when some sounds end the value still not back to zero
                for (var i = array.length - 1; i >= 0; i--) {
                    array[i] = 0;
                }
                ;
                allCapsReachBottom = true;
                for (var i = capYPositionArray.length - 1; i >= 0; i--) {
                    allCapsReachBottom = allCapsReachBottom && (capYPositionArray[i] === 0);
                }
                ;
                if (allCapsReachBottom) {
                    cancelAnimationFrame(that.animationId); //since the sound is top and animation finished, stop the requestAnimation to prevent potential memory leak,THIS IS VERY IMPORTANT!
                    return;
                }
                ;
            }
            ;
            var step = Math.round(array.length / meterNum); //sample limited data from the total array
            ctx.clearRect(0, 0, cwidth, cheight);
            for (var i = 0; i < meterNum; i++) {
                var value = array[i * step];
                if (capYPositionArray.length < Math.round(meterNum)) {
                    capYPositionArray.push(value);
                }
                ;
                ctx.fillStyle = capStyle;
                //draw the cap, with transition effect
                if (value < capYPositionArray[i]) {
                    ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
                } else {
                    ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                    capYPositionArray[i] = value;
                }
                ;
                ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
                ctx.fillRect(i * 12 /*meterWidth+gap*/, cheight - value + capHeight, meterWidth, cheight); //the meter
            }
            that.animationId = requestAnimationFrame(drawMeter);
        }
        this.animationId = requestAnimationFrame(drawMeter);
    }


}


window.onload=function(){
    window.player=new Player();
    player._init();
}

