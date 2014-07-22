/**
 * Created by peter on 14-7-19.
 */
window.onload=function(){
    var player1=new Player("file1");
    player1._prepareAPI();
    player1._readFile();

    var player2=new Player("file2");
    player2._prepareAPI();
    player2._readFile();

    document.getElementById("stopFile1").addEventListener("click",function(){
        player1._stop(player1.audio.audioSourceNode);
    });
    document.getElementById("playFile1").addEventListener("click",function(){
        player1._play();
    });
    document.getElementById("gain1").addEventListener("click",function(){
        player1._gain();
    });
}


var Player=function(id){
    this.fileId=id;
    this.audioContext=null;
    this.file=null;
    this.fillName=null;
    this.audio=null;
}

Player.prototype={
    _prepareAPI:function(){
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        try{
            this.audioContext=new AudioContext();
        }
        catch(e){
            console.log("your broswer doesn't support audioContent");
        }
    },
    _readFile:function(){
        var that=this;
        var fileUpload=document.getElementById(that.fileId);
        fileUpload.onchange=function(){
            if(fileUpload.files.length!=0){
                that.file=fileUpload.files[0];
                that.fileName=that.file.name;
                that._start();
            }
        }
    },
    _start:function(){
        var that=this;
        var fr=new FileReader();
        fr.readAsArrayBuffer(that.file);
        fr.onload=function(e){
            var fileBuffer= e.target.result;
            that.audioContext.decodeAudioData(fileBuffer,function(buffer){
                that._init(buffer);
            });
        }
    },
    _init:function(buffer){
        this.audio={
            start:0,
            offset:0,
            buffer:buffer,
            duration:buffer.duration
        }
        var audioContext=this.audioContext;

        var audioContextNode=audioContext.createBufferSource();
        audioContextNode.connect(audioContext.destination);
        audioContextNode.buffer=buffer;
        this.audio.audioSourceNode=audioContextNode;
        audioContextNode.start(0);

    },
    _stop:function(socurce){
        socurce.stop();
        this.audio.offset=this.audioContext.currentTime-this.audio.start;
    },
    _play:function(){
        var audioSourceNode=this.audioContext.createBufferSource();
        audioSourceNode.buffer=this.audio.buffer;
        this.audio.audioSourceNode=audioSourceNode;
        audioSourceNode.connect(this.audioContext.destination);
        audioSourceNode.start(0,this.audio.duration-this.audio.offset);
    },
    _gain:function(){
        var audioSourceNode=this.audioContext.createBufferSource();
        audioSourceNode.buffer=this.audio.buffer;
        this.audio.audioSourceNode=audioSourceNode;
        var gainNode=this.audioContext.createGain();
        gainNode.gain.value=-1;
//        gainNode.gain.setValueAtTime(0.5,this.audioContext.currentTime+2);
        audioSourceNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        audioSourceNode.start(0);
    }
}