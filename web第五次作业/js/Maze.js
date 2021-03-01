/*19335040 丁维力*/
/*迷宫小游戏脚本文件*/
/*初始化全局变量*/
var S_judge = false;
var W_judge = false;
var G_judge = false;
/*添加当玩家鼠标移到元素上时触发的事件监听器*/
window.onload = function () {
    document.getElementById('S').addEventListener('mouseover', over_S);
    document.getElementById('E').addEventListener('mouseover', over_E);
    var W = document.getElementsByClassName('wall');
    for(var i=0;i<W.length;i++) {
        W[i].addEventListener('mouseover', over_W);
    }
    document.getElementById('game').addEventListener('mouseleave', out_G);
}
/*鼠标移到S上*/
function over_S() {
    display("");//隐藏结果
    S_judge = true;
    G_judge = true;
    if(W_judge) {//如果墙变红则恢复原色
        W_judge = false;
        var W = document.getElementsByClassName('wall');
        for(var i=0;i<W.length;i++) {
            W[i].style.backgroundColor = "#AAEEEE";
        }
    }
}
/*鼠标移至到E上，判断结果*/
function over_E() {
    if(S_judge) {
        if (G_judge) {
            display("You Win");
        }
        else {
            display("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
        }
    }
    else {
        if (!W_judge)
            display("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
    }
    S_judge = false;
}
/*鼠标触碰墙，墙变红，游戏失败*/
function over_W() {
    if(S_judge) {
        S_judge = false;
        W_judge = true;
        var W = document.getElementsByClassName('wall');
        for(var i=0;i<W.length;i++) {
            W[i].style.backgroundColor = "red";
        }
        display("You Lose");
    }
}
/*鼠标移出游戏区域，墙恢复原色*/
function out_G() {
    if(W_judge) {
        var W = document.getElementsByClassName('wall');
        for(var i=0;i<W.length;i++) {
            W[i].style.backgroundColor = "#AAEEEE";
        }
    }
    G_judge = false;
}
/*显示游戏结果*/
function display(str) {
    document.getElementById("result").innerText = str;
}