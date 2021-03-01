/*19335040 丁维力*/
/*迷宫小游戏脚本文件*/
/*初始化全局变量*/
var S_judge = false;
var W_judge = false;
var G_judge = false;
/*添加当玩家鼠标移到元素上时触发的事件监听器*/
window.onload = function () {
    $('#S').mouseover(over_S);
    $('#E').mouseover(over_E);
    $('.wall').mouseover(over_W);
    $('#game').mouseleave(out_G);
}
/*鼠标移到S上*/
function over_S() { 
    display("");//隐藏结果
    S_judge = true;
    G_judge = true;
    if(W_judge) {//如果墙变红则恢复原色
        W_judge = false;
        $('.wall').css("backgroundColor","#AAEEEE");
    }
}
/*鼠标移至到E上，判断结果*/
function over_E() {
    if(S_judge) {
        var str=G_judge? "You Win":"Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
        display(str);
    }
    else if(!W_judge)
            display("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
    S_judge = false;
}
/*鼠标触碰墙，墙变红，游戏失败*/
function over_W() {
    if(S_judge) {
        S_judge = false;
        W_judge = true;
        $('.wall').css("backgroundColor","red");
        display("You Lose");
    }
}
/*鼠标移出游戏区域，墙恢复原色*/
function out_G() {
    if(W_judge)
        $('.wall').css("backgroundColor","#AAEEEE");
    G_judge = false;
}
/*显示游戏结果*/
function display(str) {
    $("#result").text(str);
}