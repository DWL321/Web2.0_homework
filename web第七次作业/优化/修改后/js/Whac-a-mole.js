/*19335040 丁维力*/
/*打地鼠小游戏脚本文件*/
/*初始化全局变量*/
var time_ = 30;
var timer = null;
var score_ = 0;
var mole = -1;//纪录地鼠出现位置，-1表示未出现地鼠
var hit = -2;//记录打击位置，-2表示地鼠未出现，-1表示未击打
var playing = false;
/*添加当玩家鼠标点击元素时触发的事件监听器*/
$(function () {
    $('#start').click(game_start);
    $('#stop').click(game_over);
    $('[name="hole"]').click(check);
});
// 重置控制游戏的全局变量
function reset_control(){
    hit=-2;
    time_=30;
    score_=0;
    playing=true;
    if(timer!==null)clearInterval(timer);
}
/*游戏开始，倒计时重置*/
function game_start() { 
    reset_control();
    $('#time_value').text(time_);
    $('#score_value').text(score_);
    timer=setInterval(countdown,1000);
    $("#over").text("Game Start");
    appear();
}
/*检测上一个地鼠出现的时间段内玩家是否落下锤子*/
function check_last(){
    if(hit==-1&&mole!==-1){
        score_--;
        $('#score_value').text(score_);
    }
}
/*地鼠每秒随机出现一次*/
function appear(){
    if(playing==true){
        check_last();
        var next=$('[name="hole"]')[_.random(59)].value;
        mole=(next==mole)? (next+1)%60:next;//防止连续两次地鼠在同一个地方出现
        $('[name="hole"]')[mole].checked="true";
        hit=-1;
    }
}setInterval("appear()",1000);
/*游戏倒计时*/
function countdown(){
    time_--;
    $('#time_value').text(time_);
    if(playing==false||time_<=0){
        clearInterval(timer);
        game_over();
    }
}
/*游戏结束，倒计时停止，输出结束提示*/
function game_over() {
    playing=false;
    $("#over").text("Game Over");
}
/*玩家点击洞，检测是否砸中地鼠*/
function check() {
    if(playing==true&&hit<0)
        for(hit=0;hit<$('[name="hole"]').length;hit++)
            if($('[name="hole"]')[hit].checked){
                $('[name="hole"]')[hit].checked=false;
                score_=($('[name="hole"]')[hit].value==$('[name="hole"]')[mole].value)? score_+1:score_-1;
                $('#score_value').text(score_);
                return ;
            }
}