/*19335040 丁维力*/
/*打地鼠小游戏脚本文件*/
/*初始化全局变量*/
var time_ = 30;
var timer = null;
var score_ = 0;
var mole = -1;//纪录地鼠出现位置，-1表示未出现地鼠
var hit = -2;//记录打击位置，-2表示地鼠未出现，-1表示未击打
var playing = false;
var holes = document.getElementsByName('hole');
/*添加当玩家鼠标点击元素时触发的事件监听器*/
window.onload = function () {
    document.getElementById('start').addEventListener('click', game_start);
    document.getElementById('stop').addEventListener('click', game_over);
    for(var i=0;i<holes.length;i++) {
        holes[i].addEventListener('click', check);
    }
}
/*游戏开始，倒计时重置*/
function game_start() {
    hit=-2;
    time_=30;
    document.getElementById('time_value').innerText=time_;
    score_=0;
    document.getElementById('score_value').innerText=score_;
    playing=true;
    timer=setInterval(countdown,1000);
    display("Game Start");
    appear();
}
/*地鼠每秒随机出现一次*/
function appear(){
    if(playing==true){
        if(hit==-1&&mole!==-1){
            score_--;
            document.getElementById('score_value').innerText=score_;
        }
        var last_mole=mole;
        mole=holes[Math.floor(Math.random()*60)].value;
        if(mole==last_mole){
            mole=(mole+1)%60;
        }
        holes[mole].checked="true";
        holes[mole].color="red";
        hit=-1;
    }
}setInterval("appear()",1000);
/*游戏倒计时*/
function countdown(){
    time_--;
    document.getElementById('time_value').innerText=time_;
    if(playing==false||time_==0){
        clearInterval(timer);
        game_over();
    }
}
/*游戏结束，倒计时停止，输出结束提示*/
function game_over() {
    playing=false;
    display("Game Over");
}
/*玩家点击洞，检测是否砸中地鼠*/
function check() {
    if(playing==true&&hit<0){
        for(hit=0;hit<holes.length;hit++){
            if(holes[hit].checked){
                holes[hit].checked=false;
                if(holes[hit].value==holes[mole].value)score_++;
                else score_--;
                document.getElementById('score_value').innerText=score_;
                return ;
            }
        }
    }
}
/*显示游戏是否结束*/
function display(str) {
    document.getElementById("over").innerText = str;
}