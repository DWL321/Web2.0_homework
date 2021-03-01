/*19335040 丁维力*/
/*Table Sorter js文件*/
$(function(){
	$("table").addClass("tablesorter");
	$("table").tablesorter();
    $("th").each(function () {//遍历所有的th          
        $(this).click(function () {//给当前th增加点击事件
            $(this).siblings().removeClass("up");
            $(this).siblings().removeClass("down");
            $(this).siblings().css("background-color","rgb(2,27,127)");
            if($(this).hasClass("up")){//升序变降序
                $(this).removeClass("up");
                $(this).addClass("down");
            }
            else if($(this).hasClass("down")){//降序变升序
                $(this).removeClass("down");
                $(this).addClass("up");
            }
            else{//无序变升序
                $(this).css("background-color","rgb(119, 133, 255)");
                $(this).addClass("up");
            }
        });
    });
}); 
