/**
 * Created by liyongjiang on 2017/2/16.
 */
$(document).ready(function(){
    //获取输入框
    var $intxt = $("#intext");

    //翻译按钮调用函数
    $("#in_btn").click(fanyi);
    //批量处理调用函数
    $('#read_btn').off().click(function(){
        //获取txt文本
        txtobj= $.ajax({url:"/images/txt/test",async:false});
       // $("#intext").html(txtobj.responseText);
        //转换成数组
        var txtarr=txtobj.responseText.split("\n");

        for(var i=0;i<txtarr.length;i++){
            $intxt.val(txtarr[i])
            var inval=$intxt.val()

           //console.log( inval)
            alert(inval)
            $.ajax({
                type:"get",
                //url:"http://fanyi.youdao.com/openapi.do?keyfrom=11pegasus11&key=273646050&type=data&doctype=jsonp&version=1.1",
                url:"youdao?word="+inval,
                //data:{word:inval},
                dataType:"json",
                async:false,
                success: function (result){
                    var re=result.basic.explains;
                    //console.log(re)
                    $("#textdiv1").empty();
                    //新建对应的结果文本框
                    for(var j=0;j<re.length;j++){
                        $("<input type='text'  id='"+"outtext"+j+"' class='outtext' "+"cols='30' rows='10'></input>").val(re[j]).appendTo("#textdiv")
                       // $("#outtext"+i).after("<button id='tobtn"+i+"'"+"class = 'tobtn' >导出</button>"+"</br>")
                        var  c= $('#resulttext1').val();
                        $('#resulttext1').val( c+'"'+inval+'":{'+"\n"+'     "stype":"'+re[j]+'"'+"\n"+"},"+"\n")
                    }
                   // var a=$('[type=text]').val()
                    //alert(a)

                },
                error: function () {//ajax请求失败后触发的方法
                    alert('请求失败');//弹出错误信息
                }

            });
        }
       //console.log(txtarr)
    });
    //创建翻译函数
    function fanyi(){
        //var $intxt = $("#intext");
        var inval;
        if($intxt.val()==""){
            alert("请输入中文");
        }else{
            inval=$intxt.val();
            // alert(val)
        }
       // var $outtxt =  $("#outtext");
        var outDiv = $('#textdiv');
        //结果框赋值
        outDiv.off().delegate('button','click',function(){
            var a= $(this).prev().val().toUpperCase();
            //console.log(a)
            var b= $("#intext").val();
            //console.log(b)
            var  c= $('#resulttext1').val();
            $('#resulttext1').val( c+'"'+b+'":{'+"\n"+'     "stype":"'+a+'"'+"\n"+"},"+"\n")
            //console.log($('#resulttext1').val())
        })
        //对接服务器，获取翻译结果
        $.ajax({
            type:"get",
            url:"http://fanyi.youdao.com/openapi.do?keyfrom=11pegasus11&key=273646050&type=data&doctype=jsonp&version=1.1",
            data:{q:inval},
            dataType:"jsonp",
            success: function (result){
                var re=result.basic.explains;
                //console.log(re)
                $("#textdiv1").empty();
                //新建对应的结果文本框
                for(var i=0;i<re.length;i++){
                    $("<input type='text'  id='"+"outtext"+i+"' class='outtext' "+"cols='30' rows='10'></input>"+"</br>").val(re[i]).appendTo("#textdiv")
                    $("#outtext"+i).after("<button id='tobtn"+i+"'"+"class = 'tobtn' >导出</button>")

                }
            },
            error: function () {//ajax请求失败后触发的方法
                alert('请求失败');//弹出错误信息
            }

        });

    }

})