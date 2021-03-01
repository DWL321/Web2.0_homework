/*19335040 丁维力*/
/*拼图小游戏脚本文件*/
/*初始化全局变量*/
let dif=3;//拼图块数为dif*dif，默认dif为3
let pat=2;//游戏模式，1为冒险，2为自由，默认为2
let right_position=[0,1,2,3,4,5,6,7,8];//拼图正确的状态
let timer_=null;
let time_=300;//冒险模式倒计时器
let gaming=false;//记录游戏是否正在进行中
let now;//拼图当前状态
let size;//每块拼图长宽
let empty_;//空方块位置
let game_img = 'url("../assest/background.jpg")';

/*添加当玩家鼠标点击元素时触发的事件监听器及一些初始化操作*/
$(function () {
    $('#button').click(restart);
    display("HAVE FUN");
    $('[name="difficulty"]')[0].checked="true";//默认简单等级
    $('[name="pattern"]')[1].checked="true";//默认自由模式
    $('[name="difficulty"]').click(set_difficulty);
    $('[name="pattern"]').click(set_pattern);
    set_img();
});
//清除上局游戏残留的数据
function clean(){
    if(timer!==null)clearInterval(timer_);//清除之前冒险模式残留的计时器
    $('#timer').text("");//清除之前冒险模式残留的倒计时
    set_img();//布置打乱前的拼图
}
//获得一个能复原的乱序拼图
function get_img(){
    let index;
    do {now=[];
        for (let temp = 0; temp < dif*dif; temp++) {
            do{index = _.random(dif*dif-1);
            }while (now.indexOf(index)!=-1);
            now.push(index);
        }
    } while (!isvalid(now));
}
//打乱拼图
function disrupt(){
    for (let temp = 0; temp < dif*dif; temp++) {//将拼图打乱
            let lestr = (size * (now[temp] % dif) + 'px');
            let topstr = (size * (Math.floor(now[temp] / dif)) + 'px');
            $('.piece').eq(temp).css('left',lestr);
            $('.piece').eq(temp).css('top',topstr);
    }
}
//若为冒险模式，启动倒计时
function ismaoxian(){
    if(pat==1){
        $('#timer').html("倒计时<p id=\"time\"></p>");
        time_=300;
        $('#time').text(time_);
        timer_=setInterval(maoxian,1000);
    }
}
//游戏重新开始
function restart(){
    clean();
    get_img();
    disrupt();
	display("GAME START");
	gaming=true;
    ismaoxian();
}
/*计算逆序数检测拼图是否可还原*/
function isvalid(arr){
    let count = 0;
    for(let temp1=0;temp1<dif*dif-1;temp1++)
        for(let temp2=temp1+1;temp2<dif*dif;temp2++)
            if(arr[temp1]>arr[temp2])count++;
    count+=arr[empty_]%dif+Math.floor(arr[empty_]/dif);
    if (count%2==0)return true;
    return false;
}
//布置非空白处的样式
function non_empty_img(temp,lestr,topstr,balestr,batopstr){
    $(".piece").eq(temp).css({'border': '1px green solid',
            'position': 'absolute',
            'width': size + 'px',
            'height': size + 'px',
            'left': lestr,'top': topstr,
            'background-image': game_img,
            'background-position-x': balestr,
            'background-position-y': batopstr});
}
//在第temp个位置布置正确的拼图块
function right_img(temp){
    $("#game").append("<div></div>");
    $("#game").children("div:last-child").addClass("piece");
    let lestr = (size*(temp%dif)+'px');
    let topstr = (size*(Math.floor(temp/dif))+'px');
    let balestr = (-size*(temp%dif)+'px');
    let batopstr = (-size*(Math.floor(temp/dif))+'px');  
    if (temp != dif*dif-1) non_empty_img(temp,lestr,topstr,balestr,batopstr);
    else $(".piece").eq(temp).css({"left": lestr,"top": topstr});//空白方块特殊布置
}
//按玩家选择的难度等级切割原图，并更新拼图正确的状态
function set_img(){
	gaming=false;
    size = 630/dif;
    empty_=dif*dif-1;
    while(right_position.length>0)right_position.pop();
    for(var i=0;i<dif*dif;i++)right_position.push(i);//更新拼图正确的状态
    $("#game").text("");//清除上一局残留的拼图
    for(let temp=0;temp<dif*dif;temp++) right_img(temp);//将每块拼图依次在游戏区布置好
    $(".piece").click(play); 
}
//检测玩家移动拼图操作是否合法
function check(sub){
    if (sub <= dif&&sub>=-dif&&sub!==0) {
        if (sub % dif == 0) return true;//被操作的方块在空白块上面或下面
        else if (now[empty_] % dif === 0&&sub===1) return true;//空白块在最左侧,被操作方块在空白块右侧
        else if (now[empty_] % dif === dif-1&&sub===-1) return true;//空白块在最右侧,被操作方块在空白块左侧
        else if (sub === 1 || sub === -1) return true;//空白块在中间列被操作方块在空白块左侧或右侧
    }
    return false;
}
//检测玩家是否通关
function is_win(){
    if (now.toString() === right_position.toString()){//若当前状态与正确状态相同则通关
        gaming=false;
        if(pat==1)maoxian();
        display("YOU WIN");
        dif++;//进入下一难度等级
        $('[name="difficulty"]')[dif-3].checked=true;
    }       
}
/*识别玩家对拼图的操作*/
function play() {
    if(gaming==true) {
        let ts = $(".piece").index(this);
        if(ts>=0&&ts!==empty_) {
            let sub = now[ts] - now[empty_];
            if(check(sub))movpic(ts);//操作合法则移动方块
            is_win();	               
        }
    }
}
/*移动方块*/
function movpic(ts) {
    $(".piece").eq(ts).css("left",size*(now[empty_]%dif)+'px');
    $(".piece").eq(ts).css("top",size*(Math.floor(now[empty_]/dif))+'px');
    $(".piece").eq(empty_).css("left",size*(now[ts]%dif)+'px');
    $(".piece").eq(empty_).css("top",size*(Math.floor(now[ts]/dif))+'px');
    let temp = now[ts];
    now[ts] = now[empty_];
    now[empty_] = temp;
}
//冒险模式
function maoxian(){
	time_--;
    $('#time').text(time_);
    if(gaming==false||time_==0){//游戏结束
        clearInterval(timer_);
        gaming=false;
		if(time_==0)display("GAME OVER");
    }
}
//设置难度等级
function set_difficulty(){
	if(gaming==false) {//游戏未在进行中时根据radio更新难度等级
        for(var i=0;i<$('[name="difficulty"]').length;i++)
            if($('[name="difficulty"]')[i].checked)dif=i+3;
    }
    else //游戏进行中不能修改难度等级
        for(var i=0;i<$('[name="difficulty"]').length;i++)
            if($('[name="difficulty"]')[i].value==dif-3)
                $('[name="difficulty"]')[i].checked=true;
}
//设置游戏模式
function set_pattern(){
	if(gaming==false){//游戏未在进行中时根据radio更新游戏模式
        if($('[name="pattern"]')[0].checked)pat=1;
        else pat=2;
    }
    else{//游戏进行中不能修改游戏模式
        if($('[name="pattern"]')[0].value==pat)$('[name="pattern"]')[0].checked=true;
        else $('[name="pattern"]')[1].checked=true;
    }
}
/*显示游戏结果*/
function display(str) {
    $("#result").text(str);
}