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
let difs = document.getElementsByName('difficulty');
let pats = document.getElementsByName('pattern');
let game_img = 'url("../assest/background.jpg")';

/*添加当玩家鼠标点击元素时触发的事件监听器及一些初始化操作*/
window.onload = function () {
    document.getElementById('button').addEventListener('click', restart);
    display("HAVE FUN");
    difs[0].checked="true";//默认简单等级
    pats[1].checked="true";//默认自由模式
    for(var i=0;i<difs.length;i++) {
        difs[i].addEventListener('click', set_difficulty);
    }
    pats[0].addEventListener('click', set_pattern);
    pats[1].addEventListener('click', set_pattern);
    set_img();
}
//游戏重新开始
function restart(){
	if(timer!==null)clearInterval(timer_);//清除之前冒险模式残留的计时器
	document.getElementById('timer').innerText="";//清除之前冒险模式残留的倒计时
    set_img();//布置打乱前的拼图
    let index;
    do {
    	now=[];
        for (let temp = 0; temp < dif*dif; temp++) {
            do {
                index = Math.floor(Math.random() * (dif*dif));
            } while (now.indexOf(index)!=-1);
            now.push(index);
        }
    } while (!isvalid(now));//获得一个能复原的乱序拼图
    for (let temp = 0; temp < dif*dif; temp++) {//将拼图打乱
            let lestr = (size * (now[temp] % dif) + 'px');
            let topstr = (size * (Math.floor(now[temp] / dif)) + 'px');
            let arr_of_piece=document.getElementsByClassName("piece");
            arr_of_piece[temp].style.left=lestr;
            arr_of_piece[temp].style.top=topstr;
	}
	display("GAME START");
	gaming=true;
    if(pat==1){//若为冒险模式，启动倒计时
    	document.getElementById('timer').innerHTML="倒计时<p id=\"time\"></p>";
    	time_=300;
    	document.getElementById('time').innerText=time_;
    	timer_=setInterval(maoxian,1000);
    }
}
/*计算逆序数检测拼图是否可还原*/
function isvalid(arr){
    let count = 0;
    for(let temp1=0;temp1<dif*dif-1;temp1++) {
        for(let temp2=temp1+1;temp2<dif*dif;temp2++) {
            if(arr[temp1]>arr[temp2])
                count++;
        }
    }
    count+=arr[empty_]%dif+Math.floor(arr[empty_]/dif);
    count%=2;
    if (count==0)
        return true;
    return false;
}
//按玩家选择的难度等级切割原图，并更新拼图正确的状态
function set_img(){
	gaming=false;
    size = 630/dif;
    empty_=dif*dif-1;
    while(right_position.length>0)right_position.pop();
    for(var i=0;i<dif*dif;i++){//更新拼图正确的状态
    	right_position.push(i);
    }
    let gamer = document.getElementById("game");
    gamer.innerText="";//清除上一局残留的拼图
    for(let temp=0;temp<dif*dif;temp++) {//将每块拼图依次在游戏区布置好
    	var the_piece_name=temp+"pieces";
    	var the_piece=document.createElement("div");
    	the_piece.className="piece";
    	the_piece.id=the_piece_name;
        let lestr = (size*(temp%dif)+'px');
        let topstr = (size*(Math.floor(temp/dif))+'px');
        let balestr = (-size*(temp%dif)+'px');
        let batopstr = (-size*(Math.floor(temp/dif))+'px');  
    	if (temp!==dif*dif-1) {
            the_piece.style.border='1px green solid';
            the_piece.style.position='absolute';
            the_piece.style.width=size+'px',
            the_piece.style.height=size+'px';
            the_piece.style.left=lestr;
            the_piece.style.top=topstr;
            the_piece.style.backgroundImage=game_img;
            the_piece.style.backgroundPositionX= balestr;
            the_piece.style.backgroundPositionY= batopstr;
        }
        else {//空白方块特殊布置
            the_piece.style.left=lestr;
            the_piece.style.top=topstr;
        }
        gamer.appendChild(the_piece);     
        document.getElementById(the_piece_name).addEventListener('click', play); 
    }
}
/*识别玩家对拼图的操作*/
function play() {
    if(gaming==true) {
        let ts = parseInt(this.id);//ts是被操作的方块在正确状态下的下角标
        if(ts>=0&&ts!==empty_) {
            let sub = now[ts] - now[empty_];
            if (sub <= dif&&sub>=-dif&&sub!==0) {
                if (sub % dif == 0) {//被操作的方块在空白块上面或下面
                    movpic(ts);
                }
                else if (now[empty_] % dif === 0) {//空白块在最左侧
                    if (sub===1)//被操作方块在空白块右侧
                        movpic(ts);
                }
                else if (now[empty_] % dif === dif-1) {//空白块在最右侧
                    if (sub===-1)//被操作方块在空白块左侧
                        movpic(ts);
                }
                else if (sub === 1 || sub === -1) {//空白块在中间列被操作方块在空白块左侧或右侧
                    movpic(ts);
                }
            }
            if (now.toString() === right_position.toString()){//若当前状态与正确状态相同则通关
            	gaming=false;
            	if(pat==1)maoxian();
				display("YOU WIN");
				dif++;//进入下一难度等级
				difs[dif-3].checked=true;
            }			               
        }
    }
}
/*移动方块*/
function movpic(ts) {
    /*取对象*/
    let st = document.getElementsByClassName("piece")[ts];//被操作的方块
    let ed = document.getElementsByClassName("piece")[empty_];//空方块
    let stlestr = (size*(now[ts]%dif)+'px');
    let sttopstr = (size*(Math.floor(now[ts]/dif))+'px');
    let edlestr = (size*(now[empty_]%dif)+'px');
    let edtopstr = (size*(Math.floor(now[empty_]/dif))+'px');
    /*交换位置*/
    st.style.left=edlestr;
    st.style.top=edtopstr;
    ed.style.left=stlestr;
    ed.style.top=sttopstr;
    let temp = now[ts];
    now[ts] = now[empty_];
    now[empty_] = temp;
}
//冒险模式
function maoxian(){
	time_--;
    document.getElementById('time').innerText=time_;
    if(gaming==false||time_==0){//游戏结束
        clearInterval(timer_);
        gaming=false;
		if(time_==0)display("GAME OVER");
    }
}
//设置难度等级
function set_difficulty(){
	if(gaming==false){//游戏未在进行中时根据radio更新难度等级
        for(var i=0;i<difs.length;i++){
            if(difs[i].checked){
            	dif=i+3;
                return ;
            }
        }
    }
    else{//游戏进行中不能修改难度等级
    	for(var i=0;i<difs.length;i++){
            if(difs[i].value==dif-3){
            	difs[i].checked=true;
                return ;
            }
        }
    }
}
//设置游戏模式
function set_pattern(){
	if(gaming==false){//游戏未在进行中时根据radio更新游戏模式
        if(pats[0].checked)pat=1;
        else pat=2;
    }
    else{//游戏进行中不能修改游戏模式
        if(pats[0].value==pat)pats[0].checked=true;
        else pats[1].checked=true;
    }
}
/*显示游戏结果*/
function display(str) {
    document.getElementById("result").innerText = str;
}