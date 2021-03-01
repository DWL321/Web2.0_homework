/*19335040 丁维力*/
/*简单计算器脚本文件*/
//注：非故意非法输入却显示表达式非法可能是计算机识别到连按了两次某个运算符，请重新输入
var expr_=[];//记录用户输入的算术表达式
var count_=0;//记录表达式数组长度

//若输入的算术表达式非法，弹出警告框提醒用户，并终止计算
function invalid(){
	alert('算术表达式非法！请重新输入表达式');
	clean_all();
}
//输出表达式并返回表达式的字符串形式
function do_output(){
	var the_expression=String(expr_);
	the_expression=the_expression.replace(/,/g,"");
	document.getElementById("expression").innerText=the_expression;
	return the_expression;
}
//退格并更新屏幕上的表达式
function backspace(){
	expr_.pop();
	if(count_)count_--;
	do_output();
}
//清除数组中存储的表达式
function clean(){
	while(count_--) expr_.pop();
	count_=0;
}
//清除数组中存储的表达式并清屏
function clean_all(){
	clean();
	do_output();
	document.getElementById("answer").innerText="";
}
//计算结果并输出，若表达式不合法则调用invalid()
function calculate(){
	var the_result;
	try{
		the_result=eval(do_output());
	}catch(err){
		invalid();
		return ;
	}
	clean();
	document.getElementById("answer").innerText=the_result;
	expr_.push(the_result);//将结果作为新表达式的第一个输入
	count_++;
}
//将输入存入数组并更新屏幕上的表达式
function do_input(cin_){
	document.getElementById("answer").innerText="";
	expr_.push(cin_);
	count_++;
	do_output();
}